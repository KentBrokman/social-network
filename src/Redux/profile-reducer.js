import {profileApi} from "../api/api";
import {stopSubmit} from "redux-form";
import {addErrorMessage} from "./app-reducer";

const SET_PROFILE = 'SET_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESSED = 'SAVE_PHOTO_SUCCESSED';
const ADD_POST = 'ADD_POST';
const SET_IS_FETCHING = 'SET_IS_FETCHING';

const initialState = {
    profile: null,
    status: '',
    isFetching: false,
    posts: [
        'Hello my friends!',
        'Im looking for a new job',
        'Turtles are reptiles of the order Testudines. They are characterized ' +
        'by a special bony or cartilaginous shell ' +
        'developed from their ribs that acts as a shield. "Turtle" may refer to the order as a ' +
        'whole (American English) ' +
        'or to fresh-water and sea-dwelling Testudines (British English).',
        'Very nice weather today'
    ]
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SAVE_PHOTO_SUCCESSED: {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                }
            }
        }
        case ADD_POST: {
            return {
                ...state,
                posts: [...state.posts, action.newPost]
            }
        }
        case SET_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default:
            return state;
    }
}

const setProfile = (profile) => ({type: SET_PROFILE, profile});
const setStatus = (status) => ({type: SET_STATUS, status});
const savePhotoSuccessed = (photos) => ({type: SAVE_PHOTO_SUCCESSED, photos});
export const addPost = (newPost) => ({type: ADD_POST, newPost});
const isFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching});

export const getProfile = (userId) => async (dispatch) => {
    let data = await profileApi.getProfile(userId);
    dispatch(setProfile(data))
}
export const getStatus = (userId) => async (dispatch) => {
    let data = await profileApi.getStatus(userId);
    dispatch(setStatus(data))
}
export const updateStatus = (status) => async (dispatch) => {
    dispatch(isFetching(true));
    let data = await profileApi.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(setStatus(status))
    }
    dispatch(isFetching(false));
}
export const savePhoto = (photo) => async (dispatch) => {
    dispatch(isFetching(true));
    let data = await profileApi.savePhoto(photo);
    if (data.resultCode === 0) {
        dispatch(savePhotoSuccessed(data.data.photos))
    }
    dispatch(isFetching(false));
}
export const saveProfile = (formData) => async (dispatch, getState) => {
    dispatch(isFetching(true));
    try {
        let data = await profileApi.saveProfile(formData);
        if (data.resultCode === 0) {
            const userId = getState().auth.userId;
            dispatch(getProfile(userId))
        } else {
            const error = data.messages[0];
            let errorMatch = error.match(/(?<=>)\w+/);
            let errorText = error.match(/.+(?= \()/)[0];
            let errorObj = {};
            let errorTarget = errorMatch[0][0].toLowerCase() + errorMatch[0].slice(1);
            errorObj[errorTarget] = errorText;
            dispatch(stopSubmit('profile', {'contacts': errorObj}))
            return Promise.reject(error)
        }
    } catch (e) {
        dispatch(addErrorMessage(e.message))
        return Promise.reject(e)
    }
    dispatch(isFetching(false));
}

export default profileReducer;