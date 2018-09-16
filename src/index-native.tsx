import { Navigation } from "react-native-navigation";
import './helpers/eventBus'
import { registerScreens } from "./screens";
import "./navigation/navigation-native";

registerScreens(Navigation);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        id: "root",
        name: "MobileDemo"
      }
    }
  });
});
