import {
    SET_FIND_MESSAGES_INPUT_VALUE,
    CLEAN_FIND_MESSAGES_INPUT_VALUE,
    TOGGLE_VOICE_MESSAGE_STATUS,
    DOWNLOAD_PLAYER
} from "../constants/actions";
import _ from "lodash";
import Sound from 'react-native-sound';

let player, playerUrl, playStatus = 'stop';

export const setFindMessagesInputValue = (inputValue) => (dispatch) => {
    dispatch({
        type: SET_FIND_MESSAGES_INPUT_VALUE,
        payload: inputValue
    })
}
export const cleanFindMessagesInputValue = () => ({
    type: CLEAN_FIND_MESSAGES_INPUT_VALUE
})

export const downloadPlayer = (url) => async (dispatch) => {
    playerUrl = url
    player = await getPlayer(url)
    const isDownloaded = player.isLoaded()
    dispatch({
        type: DOWNLOAD_PLAYER,
        payload: { isDownloaded, playerUrl }
    })
}

export const togglePlayer = () => (dispatch) => {
    dispatch({
        type: TOGGLE_VOICE_MESSAGE_STATUS,
        payload: { playStatus, playerUrl }
    })
    if (playStatus === 'stop') {
        player.play()
        playStatus = 'play'
    } else if (playStatus === 'play') {
        player.stop()
        playStatus = 'stop'
    }
}

function getPlayer(url) {
    return new Promise((resolve, reject) => {
        const player = new Sound(url, '', (err) => {
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