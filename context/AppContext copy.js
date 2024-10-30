import { createContext, useReducer, useEffect } from "react";
import { AppReducer, initialState } from "@/context/AppReducer";
import { toast } from "sonner";

const BASE_URL = "https://api-staging.parrot.rest";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  let refreshInterval;

  useEffect(() => {
    if (state.token) {
      initTokenInterval();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
    return () => clearInterval(refreshInterval);
  }, [state.token]);

  const login = async (email, password) => {
    dispatch({ type: "LOADING", payload: true });
    try {
      const response = await fetch(`${BASE_URL}/api/auth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      dispatch({ type: "LOADING", payload: false });
      if (data.access && data.refresh) {
        localStorage.setItem("token", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        document.cookie = `token=${data.access}; path=/; Secure`;
        dispatch({
          type: "LOGIN",
          payload: { token: data.access, refreshToken: data.refresh },
        });
      } else {
        toast.error(
          data.errors?.[0]?.message || "Hubo un error al inicio de sesión"
        );
        dispatch({
          type: "SET_ERROR",
          payload: data.errors || "Hubo un error al inicio de sesión",
        });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "No se pudo iniciar sesión" });
      dispatch({ type: "LOADING", payload: false });
    }
  };

  const initTokenInterval = () => {
    clearInterval(refreshInterval);
    refreshInterval = setInterval(async () => {
      const token = state.token;
      if (!token) return;
      const data = await validateToken(token);
      if (!data || data.errors) {
        await refreshToken();
      }
    }, 24 * 60 * 1000);
  };

  const refreshToken = async () => {
    try {
      const refresh = state.refreshToken;
      const response = await fetch(`${BASE_URL}/api/auth/token/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refresh }),
      });
      const data = await response.json();
      if (data?.access) {
        localStorage.setItem("token", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        dispatch({
          type: "LOGIN",
          payload: { token: data.access, refreshToken: data.refresh },
        });
      } else {
        sessionExpired();
      }
    } catch (error) {
      console.error("Error refresh de token:", error);
      sessionExpired();
    }
  };

  const validateToken = async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/token/test`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return await response.json();
    } catch (error) {
      console.error("Falló validación de token:", error);
      return null;
    }
  };

  const sessionExpired = () => {
    clearInterval(refreshInterval);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    toast.error("Tu sesión ha expirado, inicia sesión nuevamente");
    dispatch({
      type: "LOGIN",
      payload: { token: null, refreshToken: null },
    });
  };

  return (
    <AppContext.Provider value={{ state, login, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
