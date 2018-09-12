import { Navigation } from "react-native-navigation";
import Welcome from "./components/WelcomeScreen/welcome";
import App from "./components/App";

export function registerScreens(store, Provider) {
  Navigation.registerComponent("MobileDemo", () => App, store, Provider);
  Navigation.registerComponent("Welcome", () => Welcome, store, Provider);
  // Navigation.registerComponent('movieapp.Movies', () => Movies, store, Provider);
}
