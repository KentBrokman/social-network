import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESSFULLY = 'INITIALIZED_SUCCESSFULLY';
const ADDED_ERROR_MESSAGE = 'ADDED_ERROR_MESSAGE';
const ERROR_MESSAGE_REMOVED = 'ERROR_MESSAGE_REMOVED';


const initialState = {
    isInitialized: false,
    errorMessage: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESSFULLY: {
            return {
                ...state,
                isInitialized: true
            }
        }
        case ADDED_ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        }
        case ERROR_MESSAGE_REMOVED: {
            return {
                ...state,
                errorMessage: null
            }
        }
        default: {
            return state
        }

    }
}

const initializedSuccessfully = () => ({type: INITIALIZED_SUCCESSFULLY});
export const addErrorMessage = (errorMessage) => ({type: ADDED_ERROR_MESSAGE, errorMessage});
export const removeErrorMessage = () => ({type: ERROR_MESSAGE_REMOVED});

export const initializeApp = () => async (dispatch) => {
    await dispatch(getAuthUserData());
    dispatch(initializedSuccessfully())
}

export default appReducer;