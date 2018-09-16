import mitt from 'mitt'
const emitter = mitt()

export const on = emitter.on
export const off = emitter.off
export const emit = emitter.emit

export const NAVIGATE_WELCOME = 'NAVIGATE_WELCOME'
export const NAVIGATE_SIGNIN = 'NAVIGATE_SIGNIN'
export const NAVIGATE_SIGNUP = 'NAVIGATE_SIGNUP'