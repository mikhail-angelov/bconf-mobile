import React from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import Welcome from "./components/WelcomeScreen";

AppRegistry.registerComponent("App", () => Welcome);
AppRegistry.runApplication("App", { rootTag: document.getElementById("root") });

// Allow HMR to work
// if (module.hot) {
//   module.hot.accept();
// }
