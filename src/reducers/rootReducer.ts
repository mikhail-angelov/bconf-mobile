import { combineReducers } from 'redux'
import auth from './auth'
import chat from './chat'
import messages from './messages'

const rootReducer = combineReducers({
    auth,
    chat,
    messages,
})

export default rootReducer
