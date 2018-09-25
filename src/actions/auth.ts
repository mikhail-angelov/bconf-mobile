import {
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR,
  SIGN_UP_USER,
  REMIND_PASSWORD,
  REMIND_PASSWORD_ERROR,
  CHANGE_PASSWORD,
  SIGN_UP_ERROR
} from "../constants/actions";
import { setAuth, doJsonRequest, getToken } from "./helper";
import { AUTH_URL, SIGN_UP_URL, REMIND_PASSWORD_URL } from "./endpoinds";
import { goHome, goToAuth, goWelcome } from "../navigation/navigation";

export const initialViev = user => async dispatch => {
  try {
    if (!user.token && !user.userId) {
      goWelcome();
    } else {
      goHome();
      return dispatch({
        type: AUTH_USER,
        payload: { token: user.token }
      });
    }
  } catch (err) {
    goToAuth();
    dispatch(setAuthError("Enter login and password"));
  }
};

export const setAuthError = error => dispatch => {
  return dispatch({ type: AUTH_ERROR, payload: error });
};

export const setSignUpError = error => ({
  type: SIGN_UP_ERROR,
  payload: error
});

export const setRemindPasswordError = error => ({
  type: REMIND_PASSWORD_ERROR,
  payload: error
});

export const login = ({ email, password }) => async dispatch => {
  try {
    const resp = await doJsonRequest({
      url: AUTH_URL,
      method: "post",
      data: { email, password }
    });
    setAuth({ token: resp.token, userId: resp.user._id });
    return dispatch({
      type: AUTH_USER,
      payload: { token: resp.token }
    });
  } catch (e) {
    console.log(e);
    dispatch(setAuthError("Incorrect username or password"));
  }
};

export const logout = () => dispatch => {
  setAuth({ token: "", userId: "" });
  dispatch({ type: DEAUTH_USER });
};

export const signUp = ({ username, email, password }) => async dispatch => {
  try {
    const resp = await doJsonRequest({
      url: SIGN_UP_URL,
      method: "post",
      data: { username, email, password }
    });
    setAuth({ token: resp.token, userId: resp._id });
    dispatch({
      type: SIGN_UP_USER,
      payload: { token: resp.token, userId: resp._id }
    });
    goHome();
  } catch (e) {
    dispatch(setSignUpError("Incorrect username or password"));
  }
};

export const remindPassword = email => async (dispatch, getStore) => {
  try {
    await doJsonRequest({
      url: REMIND_PASSWORD_URL,
      method: "post",
      data: { email },
      token: getToken(getStore())
    });
    dispatch({
      type: REMIND_PASSWORD,
      payload: email
    });
    goToAuth();
  } catch (e) {
    dispatch(setRemindPasswordError("No such email registered, try again"));
  }
};

export const changePassword = ({ password, oldPassword }) => ({
  type: CHANGE_PASSWORD,
  payload: { password, oldPassword }
});
