import {
    GET_CHATS,
    GET_CHATS_ERROR,
    LOAD_MESSAGES_ERROR,
    LOAD_MESSAGES,
    SET_ACTIVE_CHAT,
    SEND_MESSAGE,
    ADD_USER_TO_CHAT_LOCALY,
    DELETE_USER_FROM_CHAT_LOCALY,
    FIND_USERS,
    CREATE_NEW_CHAT,
    DELETE_ALL_USERS_FROM_CHAT_LOCALY,
    UPDATE_CHAT,
    UPLOAD_PICTURES_IN_CHAT_START,
    UPLOAD_PICTURES_IN_CHAT_PROGRESS,
    UPLOAD_PICTURES_IN_CHAT_END,
    UPLOAD_CHAT_PHOTO_START,
    UPLOAD_CHAT_PHOTO_PROGRESS,
    UPLOAD_CHAT_PHOTO_END,
    REFRESH_CHATLIST_END,
    REFRESH_CHATLIST_START,
    GET_CHATLIST_TIMESTAMP,
    ADD_PICTURE_IN_MESSAGE_LOCALY,
    DELETE_PICTURE_IN_MESSAGE_LOCALY,
    CLEAN_PICTURE_IN_MESSAGE_LOCALY,
    OPEN_SEARCH_BAR,
    CLOSE_SEARCH_BAR,
    CLEAR_USERS_SEARCH_RESULT,
} from '../constants/actions'
import _ from 'lodash'
import RNFetchBlob from 'rn-fetch-blob'
import { AsyncStorage } from 'react-native'
import { doJsonAuthRequest, getToken, getRandomColor, getFilenameForAndroid } from './helper'
import { CHAT_URL, MESSAGE_URL, FIND_USERS_URL, UPLOAD_URL } from './endpoinds'
import { CHAT_LIST_TIMESTAMP } from '../constants/storage'
import { saveChatlistTimestamp } from './storage'
import { Platform } from 'react-native'
import { Navigation } from 'react-native-navigation'

export const sendMessage = (chatId, message) => {
    return {
        type: SEND_MESSAGE,
        payload: { chatId, message },
    }
}

export const getChatlistTimestamp = () => async dispatch => {
    try {
        const storage = await AsyncStorage.getItem(CHAT_LIST_TIMESTAMP)
        const chatlistTimestamp = JSON.parse(storage)
        dispatch({ type: GET_CHATLIST_TIMESTAMP, payload: chatlistTimestamp })
    } catch (e) {
        console.log(e)
    }
}

export const getChats = () => async dispatch => {
    dispatch(getChatlistTimestamp())
    try {
        let chats = await doJsonAuthRequest({
            url: CHAT_URL,
            method: 'get',
        })
        chats = _.map(chats, chat => ({
            ...chat,
            chatColor: getRandomColor(chat.chatId),
        }))
        dispatch({
            type: GET_CHATS,
            payload: chats,
        })
        dispatch({ type: REFRESH_CHATLIST_END })
    } catch (e) {
        console.log(e)
        dispatch({ type: GET_CHATS_ERROR })
    }
}

export const getMessages = chatId => async (dispatch, getState) => {
    try {
        const timestamp = getState().chat.lastChatsTimestamp[chatId]
        const newMessages = await doJsonAuthRequest({
            url: `${MESSAGE_URL + chatId}?timestamp=${timestamp || 0}`,
            method: 'get',
        })
        dispatch({
            type: LOAD_MESSAGES,
            payload: { newMessages, chatId },
        })
    } catch (e) {
        console.log(e)
        dispatch({ type: LOAD_MESSAGES_ERROR })
    }
}

export const setActiveChat = chatId => (dispatch, getState) => {
    const timestampsFromState = getState().chat.lastChatsTimestamp
    dispatch(getMessages(chatId))
    saveChatlistTimestamp(CHAT_LIST_TIMESTAMP, { ...timestampsFromState, [chatId]: Date.now() })
    const newActiveChat = _.find(getState().chat.chats, chat => chat.chatId === chatId)
    dispatch({ type: SET_ACTIVE_CHAT, payload: { ...newActiveChat } })
    Navigation.push('ChatList', {
        component: {
            id: 'Chat',
            name: 'Chat',
            options: {
                topBar: {
                    visible: false,
                    drawBehind: true,
                    animate: false,
                },
            },
        },
    })
}

export const unsetActiveChat = () => dispatch => {
    dispatch({ type: SET_ACTIVE_CHAT, payload: null })
}

export const findUsers = username => async dispatch => {
    try {
        const users = await doJsonAuthRequest({
            url: FIND_USERS_URL + username,
            method: 'get',
            data: { username },
        })
        dispatch({
            type: FIND_USERS,
            payload: users,
        })
    } catch (e) {
        console.log('Error :' + e)
    }
}

export const addUserToChatLocaly = user => ({
    type: ADD_USER_TO_CHAT_LOCALY,
    payload: user,
})

export const deleteUserFromChatLocaly = user => ({
    type: DELETE_USER_FROM_CHAT_LOCALY,
    payload: user,
})

export const deleteAllUsersFromChatLocaly = () => ({
    type: DELETE_ALL_USERS_FROM_CHAT_LOCALY,
})

export const clearUsersSearchResult = () => ({
    type: CLEAR_USERS_SEARCH_RESULT,
})

export const createNewChat = users => async dispatch => {
    let newChatName = ''
    const fistFourUsers = _.take(users, 4)
    _.map(fistFourUsers, user => {
        newChatName += user.name + ' '
    })
    try {
        const newChat = await doJsonAuthRequest({
            url: CHAT_URL,
            method: 'post',
            data: { users, chatName: newChatName },
        })
        const chatColor = getRandomColor(newChat.chatId)
        const newChatWithColorAndImage = {
            ...newChat,
            chatColor,
        }
        dispatch({
            type: CREATE_NEW_CHAT,
            payload: newChatWithColorAndImage,
        })
        dispatch(setActiveChat(newChat.chatId))
    } catch (e) {
        console.log('Error :' + e)
    }
}

export const updateChatSettings = chat => async dispatch => {
    const newChatName = chat.chatName
    const newChatImage = chat.chatImage
    try {
        const newChat = await doJsonAuthRequest({
            url: CHAT_URL,
            method: 'put',
            data: { chatId: chat.chatId, chatName: newChatName, chatImage: newChatImage },
        })
        dispatch(setActiveChat(newChat))
        dispatch({
            type: UPDATE_CHAT,
            payload: newChat,
        })
    } catch (e) {
        console.log('Error :' + e)
    }
}

export const changeChatPicture = (image, chat) => async dispatch => {
    const filenameForAndroid = getFilenameForAndroid(image)
    const token = await getToken()
    dispatch({
        type: UPLOAD_CHAT_PHOTO_START,
    })
    const resp = await RNFetchBlob.fetch(
        'POST',
        UPLOAD_URL,
        {
            Authorization: token,
            // this is required, otherwise it won't be process as a multipart/form-data request
            'Content-Type': 'multipart/form-data',
        },
        [
            {
                name: Platform.OS === 'ios' ? image.filename : filenameForAndroid,
                filename: Platform.OS === 'ios' ? image.filename : filenameForAndroid,
                data: RNFetchBlob.wrap(image.path),
                type: image.mime,
            },
        ]
    ).uploadProgress({ interval: 50 }, (written, total) => {
        dispatch({
            type: UPLOAD_CHAT_PHOTO_PROGRESS,
            payload: written / total,
        })
    })
    dispatch({
        type: UPLOAD_CHAT_PHOTO_END,
    })
    const newUrl = JSON.parse(resp.data)
    const newChat = await doJsonAuthRequest({
        url: CHAT_URL,
        method: 'put',
        data: { ...chat, chatImage: newUrl[Platform.OS === 'ios' ? image.filename : filenameForAndroid].url },
    })
    dispatch(setActiveChat(newChat))
    dispatch({
        type: UPDATE_CHAT,
        payload: newChat,
    })
}

export const refreshChatList = () => async dispatch => {
    dispatch({ type: REFRESH_CHATLIST_START })
    dispatch(getChats())
}

export const uploadPhotoInMessage = image => async dispatch => {
    const filenameForAndroid = getFilenameForAndroid(image)
    const token = await getToken()
    dispatch({
        type: UPLOAD_PICTURES_IN_CHAT_START,
    })
    const resp = await RNFetchBlob.fetch(
        'POST',
        UPLOAD_URL,
        {
            Authorization: token,
            // this is required, otherwise it won't be process as a multipart/form-data request
            'Content-Type': 'multipart/form-data',
        },
        [
            {
                name: Platform.OS === 'ios' ? image.filename : filenameForAndroid,
                filename: Platform.OS === 'ios' ? image.filename : filenameForAndroid,
                data: RNFetchBlob.wrap(image.path),
                type: image.mime,
            },
        ]
    ).uploadProgress({ interval: 50 }, (written, total) => {
        dispatch({
            type: UPLOAD_PICTURES_IN_CHAT_PROGRESS,
            payload: written / total,
        })
    })
    dispatch({
        type: UPLOAD_PICTURES_IN_CHAT_END,
    })
    const newPicUrl = JSON.parse(resp.data)
    dispatch({
        type: ADD_PICTURE_IN_MESSAGE_LOCALY,
        payload: newPicUrl[Platform.OS === 'ios' ? image.filename : filenameForAndroid].url,
    })
}

export const deletePhotoInMessage = imageUrl => dispatch => {
    dispatch({
        type: DELETE_PICTURE_IN_MESSAGE_LOCALY,
        payload: imageUrl,
    })
}

export const deleteAllPhotoInMessageLocaly = () => ({
    type: CLEAN_PICTURE_IN_MESSAGE_LOCALY,
})

export const openSearchBar = () => ({
    type: OPEN_SEARCH_BAR,
})

export const closeSearchBar = () => ({
    type: CLOSE_SEARCH_BAR,
})
