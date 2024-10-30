const BASE_URL = "https://api-staging.parrot.rest";

let refreshInterval;

export async function login(email, password) {
  const response = await fetch(`${BASE_URL}/api/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data;
}

export const loginRequest = async (email, password) => {
  const token = localStorage.getItem("token");
  try {
    console.log(token, "token A");
    const response = await fetch(`${BASE_URL}/api/auth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    console.log(token, "token A");
    if (!response.ok) {
      throw new Error("Error en la solicitud de inicio de sesión");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error.message || "No se pudo realizar la solicitud de inicio de sesión"
    );
  }
};

export async function validateToken() {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/token/test`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Token validation failed:", error);
  }
}

export function tokenInterval() {
  // Establece un temporizador de 24 minutos (antes de los 25 minutos de caducidad del token)
  refreshInterval = setInterval(async () => {
    if (!token) return;

    try {
      const data = await validateToken(token);
      console.log(data, "data token validate");
      if (data?.errors?.length) {
        await refreshToken();
        console.log("errors");
      }
    } catch (error) {
      console.error("Error refresh de token:", error);
      sessionExpired();
    }
  }, 1 * 60 * 1000); // 24 minutos
}

export async function refreshToken() {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const refreshTokenData = await fetch(`${BASE_URL}/api/auth/token/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    const data = await refreshTokenData.json();
    console.log(data.access, "refreshToken");
    if (data?.errors?.length) {
      sessionExpired();
    } else {
      localStorage.setItem("token", data?.access);
    }
  } catch (error) {
    console.error("Error al hacer refesh:", error);
    sessionExpired();
  }
}

export function sessionExpired() {
  clearInterval(refreshInterval);
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  window.location.href = "/";
}
