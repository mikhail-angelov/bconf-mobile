import axios from "axios";
import _ from "lodash";
import storage from "./storage";
import { AsyncStorage } from "react-native";
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

export const doJsonAuthRequest = async opts => {
  const auth = await AsyncStorage.getItem(AUTH);
  const user = JSON.parse(auth);
  opts = { ...opts, headers: { authorization: user.token } };
  return axios(opts).then(response => response.data);
};

export const getToken = async () => {
  const auth = await AsyncStorage.getItem(AUTH);
  const user = JSON.parse(auth);
  return user.token;
};
