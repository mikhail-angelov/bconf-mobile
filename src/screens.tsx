import React, { Component } from "react";
import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import App from "./components/App";
import Welcome from "./components/WelcomeScreen";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import configureStore from "./store/configureStore";

const store = configureStore();

function sceneCreator(sceneComp) {
  return () => {
    return class Wrapper extends React.Component {
      render() {
        return (
          <Provider store={store}>{React.createElement(sceneComp)}</Provider>
        );
      }
    };
  };
}

export function registerScreens() {
  Navigation.registerComponent("MobileDemo", sceneCreator(App));
  Navigation.registerComponent("Welcome", sceneCreator(Welcome));
  Navigation.registerComponent("SignIn", sceneCreator(SignIn));
  Navigation.registerComponent("SignUp", sceneCreator(SignUp));
}
