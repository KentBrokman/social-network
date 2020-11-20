import {dialogsApi} from "../api/api";

const SET_DIALOGS = 'SET_DIALOGS';
const SET_MESSAGES = 'SET_MESSAGES';
const CLEAR_MESSAGES = 'CLEAR_MESSAGES';
const SET_MESSAGE_IS_SENDING = 'SET_MESSAGE_IS_SENDING';


const initialState = {
    dialogs: null,
    messages: null,
    messageIsSending: false
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DIALOGS: {
            return {
                ...state,
                dialogs: action.dialogs
            }
        }
        case SET_MESSAGES: {
            return {
                ...state,
                messages: action.messages
            }
        }
        case CLEAR_MESSAGES: {
            return {
                ...state,
                messages: null
            }
        }
        case SET_MESSAGE_IS_SENDING: {
            return {
                ...state,
                messageIsSending: action.messageIsSending
            }
        }
        default: {
            return state
        }

    }
}

const setDialogs = (dialogs) => ({type: SET_DIALOGS, dialogs});
const setMessages = (messages) => ({type: SET_MESSAGES, messages});
const messageIsSending = (messageIsSending) => ({type: SET_MESSAGE_IS_SENDING, messageIsSending})
export const clearMessages = () => ({type: CLEAR_MESSAGES});

export const startDialog = (userId) => async (dispatch) => {
    let data = await dialogsApi.startDialog(userId);
    await dispatch(getDialogs());
    dispatch(getMessages(userId));
};
export const sendMessage = (userId, messageBody) => async (dispatch) => {
    dispatch(messageIsSending(true));
    const data = await dialogsApi.sendMessage(userId, messageBody);
    if(data.resultCode === 0) {
        await dispatch(getMessages(userId));
        dispatch(messageIsSending(false));
    }
};
export const getDialogs = () => async (dispatch) => {
    const data = await dialogsApi.getDialogs();
    dispatch(setDialogs(data));
};
export const getMessages = (userId, messagesPage = 1, messagesCount = 10) => async (dispatch) => {
    const data = await dialogsApi.getMessages(userId, messagesPage, messagesCount);
    if (!data.error) {
        dispatch(setMessages(data.items))
    }
}


export default dialogsReducer;