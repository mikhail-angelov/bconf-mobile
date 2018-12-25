import { getChats } from '../actions/chat'
import { NEW_MESSAGE, AUTH_USER, SEND_MESSAGE } from '../constants/actions'
import { BASE_URL } from '../actions/endpoinds'
import { CHAT_LIST_TIMESTAMP } from '../constants/storage'
import { saveChatlistTimestamp } from '../actions/storage'
import { BACKGROUND, FOREGROUND } from '../constants/appState'

let ws
const socketEvents = store => next => action => {
    if (action.type === AUTH_USER) {
        ws = new WebSocket(`${BASE_URL}?token=${action.payload.token}`)
        setSocketListeners(ws, store)
    } else if (action.type === SEND_MESSAGE) {
        ws.send(
            JSON.stringify({
                chatId: action.payload.chatId,
                message: action.payload.message,
            })
        )
    } else if (action.type === BACKGROUND && ws && ws.readyState === 1) {
        ws.close()
        console.log('socket closed', ws)
    } else if (action.type === FOREGROUND && store.getState().auth.authenticated) {
        ws = new WebSocket(`${BASE_URL}?token=${store.getState().auth.token}`)
        setSocketListeners(ws, store)
    }
    return next(action)
}

export default socketEvents

function setSocketListeners(ws, store) {
    ws.onopen = () => {
        console.log('connected websocket')
    }

    ws.onmessage = e => {
        const message = e.data
        console.log('message', message)
        const currentStore = store.getState()
        if (message.chatId === currentStore.chat.activeChat.chatId) {
            saveChatlistTimestamp(CHAT_LIST_TIMESTAMP, {
                ...currentStore.chat.lastChatsTimestamp,
                [message.chatId]: Date.now(),
            })
        }
        store.dispatch({ type: NEW_MESSAGE, payload: JSON.parse(message) })
    }

    ws.onerror = e => {
        console.log(e.message)
    }

    ws.onclose = e => {
        console.log(e.code, e.reason)
    }

    store.dispatch(getChats())
    return ws
}
