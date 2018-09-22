import axios from "axios";
import storage from "./storage";
import io from "socket.io-client";
import { NEW_MESSAGE } from "../constants/actions";
import { store } from "../screens";

export const auth = { username: "", password: "" };
export const setAuth = ({ username, password }) => {
  auth.username = username;
  auth.password = password;
  storage.save("AUTH", auth);
};

export const doJsonRequest = opts => {
  axios(opts).then(response => response.data);
};

// export const socketFire = () => {
//   const socket = io("https://bconf.xyz");
//   socket.on("connection", message => {
//     console.log("connection", message);
//   });
//   socket.on("chat message", message => {
//     console.log("chat message", message);
//     store.dispatch({ type: NEW_MESSAGE, payload: message });
//   });
// };
