import axios from "axios";
import _ from "lodash";
import storage from "./storage";
import { AUTH } from "../constants/storage";

export const auth = { token: "", userId: "" };
export const setAuth = ({ token, userId }) => {
  auth.token = token;
  auth.userId = userId;
  storage.save(AUTH, auth);
};

export const doJsonRequest = opts => {
  return axios(opts).then(response => response.data);
};

export const getToken = store => _.get(store, "auth.token");
