import { Navigation } from "react-native-navigation";
import App from "./components/App";
import Welcome from "./components/WelcomeScreen";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

export function registerScreens(store, Provider) {
  Navigation.registerComponent("MobileDemo", () => App, store, Provider);
  Navigation.registerComponent("Welcome", () => Welcome, store, Provider);
  Navigation.registerComponent("SignIn", () => SignIn, store, Provider);
  Navigation.registerComponent("SignUp", () => SignUp, store, Provider);
  // Navigation.registerComponent('movieapp.Movies', () => Movies, store, Provider);
}
