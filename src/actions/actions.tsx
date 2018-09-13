import { AUTH_USER, DEAUTH_USER, AUTH_ERROR } from "../constants/actions";
import { setAuth } from "./helper";

export const login = ({ username, password }) => dispatch => {
  try {
    if (username === "Admin" && password === "123456") {
      setAuth({ username, password });
      return dispatch({
        type: AUTH_USER,
        payload: username
      });
    } else {
      return dispatch({
        type: AUTH_ERROR
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const logout = () => dispatch => {
  setAuth({});
  dispatch({ type: DEAUTH_USER });
};
