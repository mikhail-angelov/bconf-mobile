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

export const downloadPlayer = url => dispatch => {
    dispatch({
        type: DOWNLOAD_PLAYER,
        payload: { playerUrl: url },
    })
}

export const togglePlayer = () => dispatch => {
    dispatch({ type: TOGGLE_VOICE_MESSAGE_STATUS })
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
