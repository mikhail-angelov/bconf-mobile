import {
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR,
  SIGN_UP_USER,
  REMIND_PASSWORD,
  CHANGE_PASSWORD,
  SIGN_UP_ERROR
} from "../constants/actions";
import { setAuth, doJsonRequest } from "./helper";
import { AUTH_URL, SIGN_UP_URL } from "./endpoinds";
import { goHome } from "../navigation/navigation";

export const setAuthError = error => dispatch => {
  return dispatch({ type: AUTH_ERROR, payload: error });
};

export const setSignUpError = error => ({
  type: SIGN_UP_ERROR,
  payload: error
});

export const login = ({ username, password }) => async dispatch => {
  try {
    const resp = await doJsonRequest({
      url: AUTH_URL,
      method: "post",
      data: { username }
    });

    setAuth({ username, password });
    return dispatch({
      type: AUTH_USER,
      payload: username
    });
  } catch (e) {
    dispatch(setAuthError("Incorrect username or password"));
  }
};

export const logout = () => dispatch => {
  setAuth({ username: "", password: "" });
  dispatch({ type: DEAUTH_USER });
};

export const signUp = ({ username, email, password }) => async dispatch => {
  try {
    await doJsonRequest({
      url: SIGN_UP_URL,
      method: "post",
      data: { username, email, password }
    });
    setAuth({ username, password });
    dispatch({
      type: SIGN_UP_USER,
      payload: { username, email, password }
    });
    goHome();
  } catch (e) {
    dispatch(setSignUpError("Incorrect username or password"));
  }
};

export const remindPassword = ({ email }) => ({
  type: REMIND_PASSWORD,
  payload: email
});

export const changePassword = ({ password, oldPassword }) => ({
  type: CHANGE_PASSWORD,
  payload: { password, oldPassword }
});
