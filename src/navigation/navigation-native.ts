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
        options: {
          topBar: {
            visible: false,

          }
        },
        id: "ChatList",
        children: [
          {
            component: {
              name: "ChatList"
            }
          }
        ],
      }
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
              name: "SignIn"
            }
          }
        ]
      }
    }
  })
);
