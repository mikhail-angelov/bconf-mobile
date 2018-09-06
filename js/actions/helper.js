import storage from "./storage";

export const auth = {};
export const setAuth = ({ username, password }) => {
  auth.username = username;
  auth.password = password;
  storage.save("AUTH", auth);
};
