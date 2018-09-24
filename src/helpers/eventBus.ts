import mitt from "mitt";
const emitter = new mitt();

export const on = emitter.on;
export const off = emitter.off;
export const emit = emitter.emit;

export const NAVIGATE_WELCOME = "NAVIGATE_WELCOME";
export const NAVIGATE_SIGNIN = "NAVIGATE_SIGNIN";
export const NAVIGATE_CHAT_LIST = "NAVIGATE_CHAT_LIST";
