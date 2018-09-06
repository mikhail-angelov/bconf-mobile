import { AUTH_USER, DEAUTH_USER } from "../constants/actions";
import { setAuth } from "./helper";

export const login = ({ username, password }) => dispatch => {
  try {
    if (username === "Admin" && password === 123456) {
      setAuth({ username, password });
      return dispatch({
        type: AUTH_USER,
        payload: username
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
