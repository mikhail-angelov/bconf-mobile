import { AUTH_USER, DEAUTH_USER, AUTH_ERROR } from "../constants/actions";

export const initialState = {
  name: "",
  authError: false
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER: {
      const username = action.payload;
      return {
        ...initialState,
        authenticated: true,
        authError: false,
        username
      };
    }
    case AUTH_ERROR: {
      return {
        ...initialState,
        authenticated: false,
        authError: action.payload
      };
    }
    case DEAUTH_USER: {
      return {
        ...initialState,
        bootstrapped: true,
        authenticated: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
};

export default auth;
