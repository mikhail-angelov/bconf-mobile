import {
    AUTH_USER,
    DEAUTH_USER,
    AUTH_ERROR,
    SIGN_UP_USER,
    REMIND_PASSWORD,
    REMIND_PASSWORD_ERROR,
    CHANGE_PASSWORD,
    SIGN_UP_ERROR,
    CHANGE_USER_SETTINGS,
    UPLOAD_USER_PHOTO_START,
    UPLOAD_USER_PHOTO_PROGRESS,
    UPLOAD_USER_PHOTO_END,
    FCM_TOKEN_SAVING_SUCCESS,
    FCM_TOKEN_SAVING_ERROR,
} from '../constants/actions'
import RNFetchBlob from 'rn-fetch-blob'
import { setAuth, doJsonRequest, doJsonAuthRequest, getFilenameForAndroid, getToken } from './helper'
import {
    AUTH_URL,
    AUTH_SOCIAL_URL,
    SIGN_UP_URL,
    REMIND_PASSWORD_URL,
    AUTH_CHECK_URL,
    UPLOAD_URL,
    UPDATE_USER_URL,
} from './endpoinds'
import { AsyncStorage } from 'react-native'
import { AUTH } from '../constants/storage'
import { goHome, goToAuth, goWelcome } from '../navigation/navigation'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import firebase from 'react-native-firebase'
import { Platform } from 'react-native'
import Config from 'react-native-config'

export const checkAuth = () => async dispatch => {
    const storage = await AsyncStorage.getItem(AUTH)
    const auth = JSON.parse(storage)
    if (auth && auth.token) {
        try {
            const resp = await doJsonRequest({
                url: AUTH_CHECK_URL,
                method: 'post',
                headers: { authorization: auth.token },
            })
            const { token, user } = resp
            goHome()
            dispatch({
                type: AUTH_USER,
                payload: { token, name: user.name, email: user.email, srcAvatar: user.srcAvatar, id: user._id },
            })
        } catch (err) {
            goToAuth()
            dispatch(setAuthError('Enter login and password'))
        }
    } else {
        goWelcome()
    }
}

export const setAuthError = error => dispatch => {
    return dispatch({ type: AUTH_ERROR, payload: error })
}

export const setSignUpError = error => ({
    type: SIGN_UP_ERROR,
    payload: error,
})

export const setRemindPasswordError = error => ({
    type: REMIND_PASSWORD_ERROR,
    payload: error,
})

export const login = ({ email, password }) => async dispatch => {
    try {
        const resp = await doJsonRequest({
            url: AUTH_URL,
            method: 'post',
            data: { email, password },
        })
        setAuth({ token: resp.token, userId: resp.user._id })
        return dispatch({
            type: AUTH_USER,
            payload: { token: resp.token, name: resp.user.name, email, srcAvatar: resp.user.srcAvatar },
        })
    } catch (e) {
        console.log(e)
        dispatch(setAuthError('Incorrect username or password'))
    }
}

export const saveFcmToken = firebaseMsgToken => async dispatch => {
    try {
        const resp = await doJsonAuthRequest({
            url: UPDATE_USER_URL,
            method: 'post',
            data: { firebaseMsgToken },
        })
        console.log('fcmToken saved successfully', resp.user)
        dispatch({ type: FCM_TOKEN_SAVING_SUCCESS, payload: 'ok!' })
    } catch (e) {
        console.log('error saving fcmToken', e)
        dispatch({ type: FCM_TOKEN_SAVING_ERROR, payload: e })
    }
}

export const loginFacebook = () => async dispatch => {
    try {
        const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email'])

        if (result.isCancelled) {
            throw new Error('User cancelled request')
        }

        const data = await AccessToken.getCurrentAccessToken()

        if (!data) {
            throw new Error('Something went wrong obtaining the users access token')
        }

        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)

        const currentUser = await firebase.auth().signInWithCredential(credential)

        const resp = await doJsonRequest({
            url: AUTH_SOCIAL_URL,
            method: 'post',
            data: currentUser.user,
        })

        setAuth({ token: resp.token, userId: resp.user._id })

        return dispatch({
            type: AUTH_USER,
            payload: {
                token: resp.token,
                name: resp.user.name,
                email: resp.user.email,
                srcAvatar: resp.user.srcAvatar,
            },
        })
    } catch (e) {
        console.error(e)
        dispatch(setAuthError('Facebook login failure.'))
    }
}

export const loginGithub = code => async dispatch => {
    try {
        fetch('https://github.com/login/oauth/access_token?', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: Config.GITHUB_CLIENT_ID,
                client_secret: Config.GITHUB_SECRET,
                code: code,
            }),
        })
            .then(response => response.json())
            .then(async responseData => {
                console.log(responseData)
                const credential = firebase.auth.GithubAuthProvider.credential(responseData.access_token)

                const currentUser = await firebase.auth().signInWithCredential(credential)

                const resp = await doJsonRequest({
                    url: AUTH_SOCIAL_URL,
                    method: 'post',
                    data: currentUser.user,
                })

                setAuth({ token: resp.token, userId: resp.user._id })

                return dispatch({
                    type: AUTH_USER,
                    payload: {
                        token: resp.token,
                        name: resp.user.name,
                        email: resp.user.email,
                        srcAvatar: resp.user.srcAvatar,
                    },
                })
            })
    } catch (e) {
        console.error(e)
        dispatch(setAuthError('Github login failure.'))
    }
}

export const logout = () => dispatch => {
    setAuth({ token: '', userId: '' })
    dispatch({ type: DEAUTH_USER })
    goToAuth()
}

export const signUp = ({ name, email, password }) => async dispatch => {
    try {
        const resp = await doJsonRequest({
            url: SIGN_UP_URL,
            method: 'POST',
            data: { name, email, password },
        })
        setAuth({ token: resp.token, userId: resp._id })
        dispatch({
            type: SIGN_UP_USER,
            payload: { token: resp.token, userId: resp._id },
        })
        goHome()
    } catch (e) {
        dispatch(setSignUpError('Incorrect username or password'))
    }
}

export const remindPassword = email => async (dispatch, getStore) => {
    try {
        await doJsonAuthRequest({
            url: REMIND_PASSWORD_URL,
            method: 'post',
            data: { email },
        })
        dispatch({
            type: REMIND_PASSWORD,
            payload: email,
        })
        goToAuth()
    } catch (e) {
        dispatch(setRemindPasswordError('No such email registered, try again'))
    }
}

export const changePassword = ({ password, oldPassword }) => ({
    type: CHANGE_PASSWORD,
    payload: { password, oldPassword },
})

export const saveProfileSettings = ({ name, email, srcAvatar }) => async dispatch => {
    try {
        const resp = await doJsonAuthRequest({
            url: CHANGE_USER_SETTINGS_URL,
            method: 'post',
            data: { name, email, srcAvatar },
        })
        dispatch({
            type: CHANGE_USER_SETTINGS,
            payload: { name: resp.name, email: resp.email, srcAvatar },
        })
    } catch (e) {
        console.log('Error: ' + e)
    }
}

export const changeUserPicture = (image, user) => async dispatch => {
    const filenameForAndroid = getFilenameForAndroid(image)
    const token = await getToken()
    dispatch({
        type: UPLOAD_USER_PHOTO_START,
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
            type: UPLOAD_USER_PHOTO_PROGRESS,
            payload: written / total,
        })
    })
    dispatch({
        type: UPLOAD_USER_PHOTO_END,
    })
    const newUrl = JSON.parse(resp.data)
    const updateUser = await doJsonAuthRequest({
        url: CHANGE_USER_SETTINGS_URL,
        method: 'post',
        data: { ...user, srcAvatar: newUrl[Platform.OS === 'ios' ? image.filename : filenameForAndroid].url },
    })
    dispatch({
        type: CHANGE_USER_SETTINGS,
        payload: updateUser,
    })
}
