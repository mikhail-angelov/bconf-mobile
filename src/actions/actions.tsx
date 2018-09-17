import {
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR,
  SIGN_UP_USER,
  REMIND_PASSWORD,
  CHANGE_PASSWORD
} from "../constants/actions";
import { setAuth } from "./helper";

export const setAuthError = (error: string) => dispatch => {
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
  setAuth({ username: "", password: "" });
  dispatch({ type: DEAUTH_USER });
};

export const signUp = ({ username, password }) => dispatch => {
  setAuth({ username, password });
  return dispatch({
    type: SIGN_UP_USER,
    payload: { username, password }
  });
};

export const remindPassword = ({ email }) => ({
  type: REMIND_PASSWORD,
  payload: email
});

export const changePassword = ({ password, oldPassword }) => ({
  type: CHANGE_PASSWORD,
  payload: { password, oldPassword }
});
