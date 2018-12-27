import {
    TOGGLE_VOICE_MESSAGE_STATUS,
    TOGGLE_VOICE_MESSAGE_BUTTON,
    SET_CURRENT_TIME,
    DOWNLOAD_PLAYER,
    GET_CURRENT_TIME,
    PLAYER_DOWNLOAD_COMPLETE,
} from '../constants/actions'
import Sound from 'react-native-sound'
import { func } from 'prop-types'

let playerUrl,
    player,
    isLast,
    timer = 0,
    playStatus = 'pause'

const messages = store => next => async action => {
    if (action.type === TOGGLE_VOICE_MESSAGE_STATUS) {
        if (playStatus === 'pause') {
            if (playerUrl !== action.payload.playerUrl) {
                playerUrl = action.payload.playerUrl
                player = await getPlayer(playerUrl)
                const audioDuration = player.getDuration()
                store.dispatch({ type: PLAYER_DOWNLOAD_COMPLETE, payload: { audioDuration, playerUrl } })
            }
            playStatus = 'play'
            player.play(success => {
                if (success) {
                    clearInterval(timer)
                    store.dispatch({
                        type: TOGGLE_VOICE_MESSAGE_BUTTON,
                        payload: { playStatus: 'pause', playerUrl },
                    })
                } else {
                    player.reset()
                }
            })
            resetPlayerListener(store.dispatch)
        } else if (playStatus === 'play') {
            clearInterval(timer)
            player.pause()
            playStatus = 'pause'
        }
        store.dispatch({
            type: TOGGLE_VOICE_MESSAGE_BUTTON,
            payload: { playStatus, playerUrl },
        })
    } else if (action.type === DOWNLOAD_PLAYER) {
        //refactor this logic
    } else if (action.type === SET_CURRENT_TIME) {
        store.dispatch({ type: GET_CURRENT_TIME, payload: { currentTime: action.payload.currentTime, playerUrl } })
        player.setCurrentTime(action.payload.currentTime)
        resetPlayerListener(store.dispatch)
    }
    return next(action)
}

export default messages

function getPlayer(url) {
    return new Promise((resolve, reject) => {
        player = new Sound(url, '', err => {
            if (err) {
                console.log('sound error', err)
                reject(err)
            } else {
                console.log('sound')
                resolve(player)
            }
        })
    })
}

function resetPlayerListener(dispatch) {
    if (timer) {
        clearInterval(timer)
    }
    let inProgress = false
    isLast = true
    timer = window.setInterval(() => {
        if (!inProgress) {
            player.getCurrentTime(time => {
                if (!isLast) {
                    dispatch({ type: GET_CURRENT_TIME, payload: { currentTime: time, playerUrl } })
                }
                inProgress = false
                isLast = false
            })
            inProgress = true
        }
    }, 250)
}
