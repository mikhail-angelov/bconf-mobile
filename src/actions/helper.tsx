import axios from "axios";
import storage from "./storage";

export const auth = { username: "", password: "" };
export const setAuth = ({ username, password }) => {
  auth.username = username;
  auth.password = password;
  storage.save("AUTH", auth);
};

export const doJsonRequest = opts =>
  axios(opts).then(response => response.data);
