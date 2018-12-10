import React from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import Welcome from "./components/WelcomeScreen";
import bgMessaging from './firebase/bgMessaging';

AppRegistry.registerComponent("App", () => Welcome);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
AppRegistry.runApplication("App", { rootTag: document.getElementById("root") });

// Allow HMR to work
// if (module.hot) {
//   module.hot.accept();
// }
