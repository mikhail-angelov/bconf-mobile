import React from 'react'
import { Provider } from 'react-redux'
import { AppState } from 'react-native'
import App from './components/App'
import Welcome from './components/WelcomeScreen'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'
import configureStore from './store/configureStore'
import ForgotPassword from './components/Auth/ForgotPassword'
import Chat from './components/Chat'
import ChatList from './components/ChatList'
import ProfileSettings from './components/ProfileSettings'
import AddChat from './components/AddChat'
import ChatSettings from './components/ChatSettings'
import { FOREGROUND, BACKGROUND, INACTIVE } from './constants/appState'

const store = configureStore({})

const handleAppStateChange = nextAppState => {
    switch (nextAppState) {
        case 'active':
            store.dispatch({ type: FOREGROUND })
            break
        case 'background':
            store.dispatch({ type: BACKGROUND })
            break
        case 'inactive':
            store.dispatch({ type: INACTIVE })
            break
        default:
            return
    }
}

AppState.addEventListener('change', handleAppStateChange)

export function registerScreens(Navigation) {
    Navigation.registerComponent('MobileDemo', () => () => (
        <Provider store={store}>
            <App />
        </Provider>
    ))
    Navigation.registerComponent('Welcome', () => () => (
        <Provider store={store}>
            <Welcome />
        </Provider>
    ))
    Navigation.registerComponent('SignIn', () => () => (
        <Provider store={store}>
            <SignIn />
        </Provider>
    ))
    Navigation.registerComponent('SignUp', () => () => (
        <Provider store={store}>
            <SignUp />
        </Provider>
    ))
    Navigation.registerComponent('ForgotPassword', () => () => (
        <Provider store={store}>
            <ForgotPassword />
        </Provider>
    ))
    Navigation.registerComponent('Chat', () => () => (
        <Provider store={store}>
            <Chat />
        </Provider>
    ))
    Navigation.registerComponent('ChatList', () => () => (
        <Provider store={store}>
            <ChatList />
        </Provider>
    ))
    Navigation.registerComponent('ProfileSettings', () => () => (
        <Provider store={store}>
            <ProfileSettings />
        </Provider>
    ))
    Navigation.registerComponent('AddChat', () => () => (
        <Provider store={store}>
            <AddChat />
        </Provider>
    ))
    Navigation.registerComponent('ChatSettings', () => () => (
        <Provider store={store}>
            <ChatSettings />
        </Provider>
    ))
}
