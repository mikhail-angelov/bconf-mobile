import { AppState } from 'react-native';
import { FOREGROUND, BACKGROUND, INACTIVE } from "../constants/appState";


const appStateMiddleware = store => next => action => {

  let currentState = '';

  const handleAppStateChange = (nextAppState) => {
    console.log(currentState, nextAppState);
    if (currentState !== nextAppState) {
      let type;
      if (nextAppState === 'active') {
        type = FOREGROUND;
      } else if (nextAppState === 'background') {
        type = BACKGROUND;
      } else if (nextAppState === 'inactive') {
        type = INACTIVE;
      }
      if (type) {
        store.dispatch({
          type,
        });
      }
      currentState = nextAppState;
    }

  };

  AppState.addEventListener('change', handleAppStateChange);
  return next(action);
};

export default appStateMiddleware;