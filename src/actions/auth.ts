import {
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR,
  SIGN_UP_USER,
  REMIND_PASSWORD,
  REMIND_PASSWORD_ERROR,
  CHANGE_PASSWORD,
  SIGN_UP_ERROR,
  CHANGE_USER_SETTINGS,
} from "../constants/actions";
import { setAuth, doJsonRequest, doJsonAuthRequest } from "./helper";
import {
  AUTH_URL,
  SIGN_UP_URL,
  REMIND_PASSWORD_URL,
  AUTH_CHECK_URL,
  CHANGE_USER_SETTINGS_URL,
} from "./endpoinds";
import { AsyncStorage } from "react-native";
import { AUTH } from "../constants/storage";
import { goHome, goToAuth, goWelcome } from "../navigation/navigation";

export const checkAuth = () => async dispatch => {
  const storage = await AsyncStorage.getItem(AUTH);
  const auth = JSON.parse(storage);
  if (auth && auth.token) {
    try {
      const resp = await doJsonRequest({
        url: AUTH_CHECK_URL,
        method: "post",
        headers: { authorization: auth.token }
      });
      const { token, user } = resp
      goHome();
      dispatch({
        type: AUTH_USER,
        payload: { token, name: user.name, email: user.email, srcAvatar: user.srcAvatar }
      });
    } catch (err) {
      goToAuth();
      dispatch(setAuthError("Enter login and password"));
    }
  } else {
    goWelcome();
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
      payload: { token: resp.token, name: resp.user.name, email, srcAvatar: resp.user.srcAvatar }
    });
  } catch (e) {
    console.log(e);
    dispatch(setAuthError("Incorrect username or password"));
  }
};

export const logout = () => dispatch => {
  setAuth({ token: "", userId: "" });
  dispatch({ type: DEAUTH_USER });
  goToAuth();
};

export const signUp = ({ name, email, password }) => async dispatch => {
  try {
    const resp = await doJsonRequest({
      url: SIGN_UP_URL,
      method: "POST",
      data: { name, email, password }
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
    await doJsonAuthRequest({
      url: REMIND_PASSWORD_URL,
      method: "post",
      data: { email }
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

export const saveProfileSettings = ({ name, email, srcAvatar }) => async dispatch => {
  try {
    const resp = await doJsonAuthRequest({
      url: CHANGE_USER_SETTINGS_URL,
      method: "post",
      data: { name, email, srcAvatar }
    });
    dispatch({
      type: CHANGE_USER_SETTINGS,
      payload: { name: resp.name, email: resp.email, srcAvatar: resp.srcAvatar }
    });
  } catch (e) {
    console.log("Error: " + e);
  }
};
