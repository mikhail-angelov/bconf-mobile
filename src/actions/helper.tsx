import axios from "axios";
import storage from "./storage";
import io from "socket.io-client";

export const auth = { username: "", password: "" };
export const setAuth = ({ username, password }) => {
  auth.username = username;
  auth.password = password;
  storage.save("AUTH", auth);
};

export const doJsonRequest = opts => {
  axios(opts).then(response => response.data);
};

export const socketFire = () => {
  const socket = io("https://bconf.xyz/");
  socket.on("connection", msg => {
    console.log("connection", msg);
  });
  socket.on("chat message", msg => {
    console.log("chat message", msg);
  });
};
