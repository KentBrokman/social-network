import {authApi} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';
const SET_LOGINING = 'SET_LOGINING';


const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
    logining: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
        case SET_CAPTCHA_URL: {
            return {
                ...state,
                ...action.payload
            }
        }
        case SET_LOGINING: {
            return {
                ...state,
                logining: action.logining
            }
        }
        default: {
            return state
        }

    }
}

const setAuthUserData = (userId, email, login, isAuth, captchaUrl) => ({
    type: SET_AUTH_USER_DATA,
    payload: {userId, email, login, isAuth, captchaUrl}
});
const setCaptchaUrl = (captchaUrl) => ({type: SET_CAPTCHA_URL, payload: {captchaUrl}});
const logining = (logining) => ({type: SET_LOGINING, logining});


export const getAuthUserData = () => async (dispatch) => {
    const data = await authApi.me();
    if (data.resultCode === 0) {
        const {id, email, login} = data.data;
        dispatch(setAuthUserData(id, email, login, true, null))
    }
}
export const logInUser = (loginData) => async (dispatch) => {
    dispatch(logining(true));
    const data = await authApi.logIn(loginData);
    if (data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else if (data.resultCode === 10) {
        dispatch(getCaptchaUrl())
    } else {
        const error = data.messages.length > 0 ? data.messages[0] : 'Common error';
        dispatch(stopSubmit('login', {_error: error}))
    }
    dispatch(logining(false));
}
export const logOutUser = () => async (dispatch) => {
    dispatch(logining(true));
    const data = await authApi.logOut();
    if (data.resultCode === 0) {
        await dispatch(setAuthUserData(null, null, null, false, null));
        dispatch(logining(false));
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    const data = await authApi.getCaptchaUrl();
    dispatch(setCaptchaUrl(data.url))
}

export default authReducer;