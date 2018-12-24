import { TOGGLE_VOICE_MESSAGE_STATUS, GET_CURRENT_TIME } from '../constants/actions'

let timer = 0

const messages = store => next => action => {
    if (action.type === TOGGLE_VOICE_MESSAGE_STATUS) {
        if (action.payload.playStatus === 'play') {
            timer = window.setInterval(() => {
                console.log(action.payload.player)
                const currentTime = action.payload.player.getCurrentTime()
                const playerUrl = action.payload.playerUrl
                console.log(currentTime)
                store.dispatch({ type: GET_CURRENT_TIME, payload: { currentTime, playerUrl } })
            }, 1000)
        } else if (timer) {
            clearInterval(timer)
        }
    }

    return next(action)
}

export default messages
