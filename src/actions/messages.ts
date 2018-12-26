import {
    SET_FIND_MESSAGES_INPUT_VALUE,
    CLEAN_FIND_MESSAGES_INPUT_VALUE,
    TOGGLE_VOICE_MESSAGE_STATUS,
    DOWNLOAD_PLAYER,
    SET_CURRENT_TIME,
    CLEAR_TIMEOUT
} from '../constants/actions'
import _ from 'lodash'
import Sound from 'react-native-sound'

let player,
    playerUrl,
    playStatus = 'pause'

export const setFindMessagesInputValue = inputValue => dispatch => {
    dispatch({
        type: SET_FIND_MESSAGES_INPUT_VALUE,
        payload: inputValue,
    })
}
export const cleanFindMessagesInputValue = () => ({
    type: CLEAN_FIND_MESSAGES_INPUT_VALUE,
})

export const downloadPlayer = url => async dispatch => {
    playerUrl = url
    player = await getPlayer(url)
    const isDownloaded = player.isLoaded()
    const audioDuration = Math.floor(player.getDuration())
    dispatch({
        type: DOWNLOAD_PLAYER,
        payload: { isDownloaded, playerUrl, audioDuration, player },
    })
}

export const togglePlayer = () => dispatch => {
    if (playStatus === 'pause') {
        player.play(success => {
            if (success) {
                dispatch({
                    type: TOGGLE_VOICE_MESSAGE_STATUS,
                    payload: { playStatus: 'pause', playerUrl, player },
                })
            } else {
                player.reset()
            }
        })
        playStatus = 'play'
    } else if (playStatus === 'play') {
        player.pause()
        playStatus = 'pause'
    }
    dispatch({
        type: TOGGLE_VOICE_MESSAGE_STATUS,
        payload: { playStatus, playerUrl, player },
    })
}

function getPlayer(url) {
    return new Promise((resolve, reject) => {
        const player = new Sound(url, '', err => {
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

export const setCurrentTime = value => dispatch => {
    player.setCurrentTime(value)
    dispatch({
        type: TOGGLE_VOICE_MESSAGE_STATUS,
        payload: { playStatus, playerUrl, player },
    })
}

export const clearTimeout = () => dispatch => {
    dispatch({ type: CLEAR_TIMEOUT })
}
