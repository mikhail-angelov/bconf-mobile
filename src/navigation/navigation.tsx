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
      bottomTabs: {
        id: "BottomTabsId",
        children: [
          {
            component: {
              name: "SignIn",
              options: {
                bottomTab: {
                  fontSize: 12,
                  text: "Sign In"
                }
              }
            }
          },
          {
            component: {
              name: "SignUp",
              options: {
                bottomTab: {
                  text: "Sign Up",
                  fontSize: 12
                }
              }
            }
          }
        ]
      }
    }
  });

export const goHome = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: "App",
        children: [
          {
            component: {
              name: "MobileDemo"
            }
          }
        ]
      }
    }
  });
