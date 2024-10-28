export const initialState = {
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoaging: false,
  error: null,
};

export const AppReducer = (state, action) => {
  console.log(state, "state Reducer");
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
    default:
      return state;
  }
};
