import { Navigation } from "react-native-navigation";
import { on, NAVIGATE_WELCOME, NAVIGATE_SIGNIN, NAVIGATE_SIGNUP } from '../helpers/eventBus'

on(NAVIGATE_WELCOME, () =>
  Navigation.setRoot({
    root: {
      component: {
        id: "Welcome",
        name: "Welcome"
      }
    }
  }));

on(NAVIGATE_SIGNIN, () =>
  Navigation.setRoot({
    root: {
      component: {
        id: "SignIn",
        name: "SignIn"
      }
    }
  }));

  on(NAVIGATE_SIGNUP, () =>
  Navigation.setRoot({
    root: {
      component: {
        id: "SignUp",
        name: "SignUp"
      }
    }
  }));
