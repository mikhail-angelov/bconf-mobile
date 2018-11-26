import {
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR,
  SIGN_UP_ERROR,
  REMIND_PASSWORD_ERROR,
  SIGN_UP_USER,
  CHANGE_USER_SETTINGS,
  CLEAR_AUTH_ERRORS,
  UPLOAD_USER_PHOTO_START,
  UPLOAD_USER_PHOTO_PROGRESS,
  UPLOAD_USER_PHOTO_END,
} from "../constants/actions";
import { BACKGROUND } from "../constants/appState";

const initialState = {
  name: "",
  authError: "",
  signUpError: "",
  authenticated: false,
  remindPasswordError: "",
  users: []
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case BACKGROUND: {
      return {
        ...state,
        authError: "",
        signUpError: "",
        remindPasswordError: ""
      }
    };
    case AUTH_USER:
    case SIGN_UP_USER: {
      const { token, name, email, srcAvatar, id } = action.payload;
      return {
        ...state,
        authenticated: true,
        authError: "",
        token,
        name,
        email,
        srcAvatar,
        id
      };
    }
    case AUTH_ERROR: {
      return {
        ...state,
        authenticated: false,
        authError: action.payload
      };
    }
    case DEAUTH_USER: {
      return {
        ...state,
        bootstrapped: true,
        authenticated: false,
        error: action.payload,
        token: ""
      };
    }
    case SIGN_UP_ERROR: {
      return {
        ...state,
        authenticated: false,
        signUpError: action.payload
      };
    }
    case REMIND_PASSWORD_ERROR: {
      return {
        ...state,
        remindPasswordError: action.payload
      };
    }
    case CHANGE_USER_SETTINGS: {
      const { name, email, srcAvatar } = action.payload;
      return {
        ...state,
        name,
        email,
        srcAvatar
      };
    }
    case UPLOAD_USER_PHOTO_START: {
      return { ...state, uploadingUserPhoto: true };
    }
    case UPLOAD_USER_PHOTO_END: {
      return { ...state, uploadingUserPhoto: false, uploadingUserPhotoProgress: 0 };
    }
    case UPLOAD_USER_PHOTO_PROGRESS: {
      return { ...state, uploadingUserPhotoProgress: action.payload };
    }
    default:
      return state;
  }
};

export default auth;
