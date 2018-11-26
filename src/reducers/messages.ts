import { GET_MESSAGES, RECEIVE_MESSAGE, NEW_MESSAGE, GET_NEW_MESSAGES } from "../constants/actions";

const initialState = {

}

const messages = (state = initialState, action) => {
    switch (action.type) {
        case GET_MESSAGES: {
            console.log(action.payload.messages)
            return state[action.payload.chatId] ?
                { ...state, [action.payload.chatId]: [...state[action.payload.chatId], ...action.payload.messages] } :
                { ...state, [action.payload.chatId]: action.payload.messages }
        }
        case RECEIVE_MESSAGE:
        case NEW_MESSAGE: {
            return { ...state, [action.payload.chatId]: [...state[action.payload.chatId], action.payload] }
        }
        default:
            return state;
    }
}

export default messages;