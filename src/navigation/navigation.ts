import {
  emit,
  NAVIGATE_WELCOME,
  NAVIGATE_SIGNIN,
  NAVIGATE_CHAT_LIST
} from "../helpers/eventBus";

export const goWelcome = () => emit(NAVIGATE_WELCOME);
export const goToAuth = () => emit(NAVIGATE_SIGNIN);
export const goHome = () => emit(NAVIGATE_CHAT_LIST);
