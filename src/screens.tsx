import React, { Component } from "react";
import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import App from "./components/App";
import Welcome from "./components/WelcomeScreen";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import configureStore from "./store/configureStore";

const store = configureStore();

export function registerScreens() {
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
}
