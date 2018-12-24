import { createStore, applyMiddleware, compose } from 'redux'
import { offline } from '@redux-offline/redux-offline'
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from '../reducers/rootReducer'
import socketEvents from '../middleware/socketEvents'
import messages from '../middleware/messages'

let middleware = [thunk, socketEvents, messages]

if (true) {
    middleware = [...middleware, logger]
} else {
    middleware = [...middleware]
}

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            offline(offlineConfig)
        )
    )
}
