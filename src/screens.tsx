import React from "react";
import { Provider } from "react-redux";
import App from "./components/App";
import Welcome from "./components/WelcomeScreen";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import configureStore from "./store/configureStore";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Chat from "./components/Chat";
import ChatList from "./components/ChatList";

const store = configureStore({});

export function registerScreens(Navigation) {
  Navigation.registerComponent("MobileDemo", () => () => (
    <Provider store={store}>
      <App />
    </Provider>
  ));
  Navigation.registerComponent("Welcome", () => () => (
    <Provider store={store}>
      <Welcome />
    </Provider>
  ));
  Navigation.registerComponent("SignIn", () => () => (
    <Provider store={store}>
      <SignIn />
    </Provider>
  ));
  Navigation.registerComponent("SignUp", () => () => (
    <Provider store={store}>
      <SignUp />
    </Provider>
  ));
  Navigation.registerComponent("ForgotPassword", () => () => (
    <Provider store={store}>
      <ForgotPassword />
    </Provider>
  ));
  Navigation.registerComponent("Chat", () => () => (
    <Provider store={store}>
      <Chat />
    </Provider>
  ));
  Navigation.registerComponent("ChatList", () => () => (
    <Provider store={store}>
      <ChatList />
    </Provider>
  ));
}
