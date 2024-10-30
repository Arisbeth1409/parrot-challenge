export const initialState = {
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoaging: false,
  error: null,
  store: {},
  products: [],
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
        error: null,
      };
    case "LOADING":
      return { ...state, isLoaging: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_STORE":
      return { ...state, store: action.payload };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    default:
      return state;
  }
};
