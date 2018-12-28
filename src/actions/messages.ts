import {
    SET_FIND_MESSAGES_INPUT_VALUE,
    CLEAN_FIND_MESSAGES_INPUT_VALUE,
    TOGGLE_VOICE_MESSAGE_STATUS,
    DOWNLOAD_PLAYER,
    SET_CURRENT_TIME,
    CLEAR_TIMEOUT,
} from '../constants/actions'
import _ from 'lodash'

export const setFindMessagesInputValue = inputValue => dispatch => {
    dispatch({
        type: SET_FIND_MESSAGES_INPUT_VALUE,
        payload: inputValue,
    })
}
export const cleanFindMessagesInputValue = () => ({
    type: CLEAN_FIND_MESSAGES_INPUT_VALUE,
})

export const togglePlayer = (url, messageId) => dispatch => {
    dispatch({ type: TOGGLE_VOICE_MESSAGE_STATUS, payload: { playerUrl: url, messageId} })
}

export const setCurrentTime = value => dispatch => {
    dispatch({
        type: SET_CURRENT_TIME,
        payload: { currentTime: value },
    })
}

export const clearTimeout = () => dispatch => {
    dispatch({ type: CLEAR_TIMEOUT })
}
