import {
    LOAD_MESSAGES,
    NEW_MESSAGE,
    CLEAN_FIND_MESSAGES_INPUT_VALUE,
    SET_FIND_MESSAGES_INPUT_VALUE,
    TOGGLE_VOICE_MESSAGE_STATUS,
    DOWNLOAD_PLAYER,
    CLEAN_CHAT,
    GET_CURRENT_TIME,
} from '../constants/actions'
import _ from 'lodash'

export const initialState = {
    findMessagesInputValue: '',
    allMessages: [],
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
        case TOGGLE_VOICE_MESSAGE_STATUS: {
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
        case DOWNLOAD_PLAYER: {
            return {
                ...state,
                voiceMessagePlayers: {
                    [action.payload.playerUrl]: {
                        ...state.voiceMessagePlayers[action.payload.playerUrl],
                        isDownloaded: action.payload.isDownloaded,
                        audioDuration: action.payload.audioDuration,
                        playStatus: false,
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
                voiceMessagePlayers: {
                    [action.payload.playerUrl]: {
                        ...state.voiceMessagePlayers[action.payload.playerUrl],
                        currentTime: action.payload.currentTime,
                    },
                },
            }
        }
        default:
            return state
    }
}

export default messages
