import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import profileReducer, {ADD_POST} from "./profile-reducer";
import authReducer from "./auth-reducer"
import {reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer";
import usersReducer from "./users-reducer";
import dialogsReducer from "./dialogs-reducer";
import ticTacToeReducer from "./ticTacToe-reducer";


const reducers = combineReducers({
    profilePage: profileReducer,
    auth: authReducer,
    app: appReducer,
    usersPage: usersReducer,
    dialogsPage: dialogsReducer,
    ticTacToePage: ticTacToeReducer,
    form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.__store__ = store;

export default store;