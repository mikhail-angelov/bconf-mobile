import { TOGGLE_VOICE_MESSAGE_STATUS, GET_CURRENT_TIME, SET_CURRENT_TIME } from '../constants/actions'

let currentTime,
    timer = 0

const messages = store => next => action => {
    if (action.type === TOGGLE_VOICE_MESSAGE_STATUS) {
        const playerUrl = action.payload.playerUrl
        if (action.payload.playStatus === 'play') {
            timer = window.setInterval(() => {
                action.payload.player.getCurrentTime(time => (currentTime = Math.floor(time)))
                store.dispatch({ type: GET_CURRENT_TIME, payload: { currentTime, playerUrl } })
            }, 1000)
        } else if (timer) {
            clearInterval(timer)
        }
    } else if (action.type === SET_CURRENT_TIME && timer) {
        clearInterval(timer)
    }
    return next(action)
}

export default messages
