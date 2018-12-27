import {
    LOAD_MESSAGES,
    NEW_MESSAGE,
    CLEAN_FIND_MESSAGES_INPUT_VALUE,
    SET_FIND_MESSAGES_INPUT_VALUE,
    TOGGLE_VOICE_MESSAGE_BUTTON,
    PLAYER_DOWNLOAD_COMPLETE,
    CLEAN_CHAT,
    GET_CURRENT_TIME,
} from '../constants/actions'
import _ from 'lodash'

export const initialState = {
    findMessagesInputValue: '',
    allMessages: [],
    currentTime: 0,
}

const messages = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_MESSAGES: {
            return state.allMessages[action.payload.chatId]
                ? {
                      ...state,
                      allMessages: {
                          ...state.allMessages,
                          [action.payload.chatId]: [
                              ...action.payload.newMessages,
                              ...state.allMessages[action.payload.chatId],
                          ],
                      },
                  }
                : {
                      ...state,
                      allMessages: { ...state.allMessages, [action.payload.chatId]: action.payload.newMessages },
                  }
        }
        case NEW_MESSAGE: {
            return {
                ...state,
                allMessages: {
                    ...state.allMessages,
                    [action.payload.chatId]: [action.payload, ...state.allMessages[action.payload.chatId]],
                },
            }
        }
        case SET_FIND_MESSAGES_INPUT_VALUE: {
            return { ...state, findMessagesInputValue: action.payload }
        }
        case CLEAN_FIND_MESSAGES_INPUT_VALUE: {
            return { ...state, findMessagesInputValue: '' }
        }
        case TOGGLE_VOICE_MESSAGE_BUTTON: {
            return {
                ...state,
                voiceMessagePlayers: {
                    [action.payload.playerUrl]: {
                        ...state.voiceMessagePlayers[action.payload.playerUrl],
                        playStatus: action.payload.playStatus,
                    },
                },
            }
        }
        case PLAYER_DOWNLOAD_COMPLETE: {
            return {
                ...state,
                voiceMessagePlayers: {
                    [action.payload.playerUrl]: {
                        ...state.voiceMessagePlayers[action.payload.playerUrl],
                        isDownloaded: action.payload.isDownloaded,
                        audioDuration: action.payload.audioDuration,
                        playStatus: 'pause',
                    },
                },
            }
        }
        case CLEAN_CHAT: {
            return { ...state, voiceMessagePlayers: {} }
        }
        case GET_CURRENT_TIME: {
            return {
                ...state,
                currentTime: action.payload.currentTime,
                voiceMessagePlayers: {
                    [action.payload.playerUrl]: {
                        ...state.voiceMessagePlayers[action.payload.playerUrl],
                    },
                },
            }
        }
        default:
            return state
    }
}

export default messages
