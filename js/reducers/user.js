import { AUTH_USER, DEAUTH_USER } from "../actions/user";

export const initialState = {
  name: ""
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER: {
      const username = action.payload;
      return {
        ...initialState,
        authenticated: true,
        bootstrapped: true,
        username
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
