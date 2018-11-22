import { Navigation } from "react-native-navigation";
import {
  on,
  NAVIGATE_WELCOME,
  NAVIGATE_SIGNIN,
  NAVIGATE_CHAT_LIST
} from "../helpers/eventBus";

on(NAVIGATE_WELCOME, () =>
  Navigation.setRoot({
    root: {
      component: {
        id: "Welcome",
        name: "Welcome"
      }
    }
  })
);
on(NAVIGATE_CHAT_LIST, () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              id: "ChatList",
              name: "ChatList",
              options: {
                topBar: {
                  visible: false,
                  drawBehind: true,
                  animate: false,
                }
              },
            }
          },
        ],
      },
    }
  });
});

on(NAVIGATE_SIGNIN, () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: "SignIn",
        children: [
          {
            component: {
              name: "SignIn",
              options: {
                topBar: {
                  visible: false,
                  drawBehind: true,
                  animate: false,
                }
              },
            }
          }
        ]
      }
    }
  })
);
