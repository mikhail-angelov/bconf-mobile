import { Navigation } from "react-native-navigation";
import { Provider } from "redux";
import { registerScreens } from "./src/screens";
import configureStore from "./src/store/configureStore";

const store = configureStore();

registerScreens(store, Provider);

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
