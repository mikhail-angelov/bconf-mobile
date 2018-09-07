import { AUTH_USER, DEAUTH_USER, AUTH_ERROR } from "../constants/actions";

export const initialState = {
  name: "",
  authError: false
};

const user = (state = initialState, action) => {
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
        authError: true
      };
    }
    case DEAUTH_USER: {
      return { ...initialState, bootstrapped: true, error: action.payload };
    }
    default:
      return state;
  }
};

export default user;
