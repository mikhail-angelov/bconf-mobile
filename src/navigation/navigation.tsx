import { Navigation } from "react-native-navigation";

export const goWelcome = () =>
  Navigation.setRoot({
    root: {
      component: {
        id: "Welcome",
        name: "Welcome"
      }
    }
  });

export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      component: {
        id: "SignIn",
        name: "SignIn"
      }
    }
  });

export const goHome = () =>
  Navigation.setRoot({
    root: {
      component: {
        id: "SignUp",
        name: "SignUp"
      }
    }
  });
