import storage from "./storage";

export const auth = {username:'', password:''};
export const setAuth = ({ username, password }) => {
  auth.username = username;
  auth.password = password;
  storage.save("AUTH", auth);
};
