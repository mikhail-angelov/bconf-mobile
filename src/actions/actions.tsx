import { AUTH_USER, DEAUTH_USER, AUTH_ERROR } from "../constants/actions";
import { setAuth } from "./helper";

export const setAuthError = error => dispatch => {
  return dispatch({ type: AUTH_ERROR, payload: error });
};

export const login = ({ username, password }) => dispatch => {
  try {
    if (username === "Admin" && password === "123456") {
      setAuth({ username, password });
      return dispatch({
        type: AUTH_USER,
        payload: username
      });
    } else {
      dispatch(setAuthError("Incorrect username or password"));
    }
  } catch (err) {
    setAuthError(err);
  }
};

export const logout = () => dispatch => {
  setAuth({username: '', password:''});
  dispatch({ type: DEAUTH_USER });
};
