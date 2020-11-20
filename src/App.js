import React, {useEffect} from 'react';
import styles from './App.module.css';
import Sidebar from "./components/Sidebar/Sidebar";
import Apps from "./components/Apps/Apps";
import {Redirect, Route, Switch} from "react-router-dom";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect} from "react-redux";
import preloaderLarge from "./imgs/preloaderLarge.svg"
import {initializeApp} from "./Redux/app-reducer";
import UsersContainer from "./components/Users/UsersContainer";
import LoginContainer from "./components/Login/LoginContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import MessagesContainer from "./components/Dialogs/Messages/MessagesContainer";
import FriendsContainer from "./components/Users/Friends/FriendsContainer";
import TicTacToeContainer from "./components/Apps/TicTacToe/TicTacToeContainer";

function App({isInitialized, initializeApp, errorMessage}) {
    useEffect(() => {
        initializeApp();
    }, [])
    return (
        <div className={styles.appWrapper}>
            <HeaderContainer/>
            <Sidebar/>
            {isInitialized ?
                <div className={styles.appWrapperContent}>
                    <Switch>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/dialogs/messages/:userId' render={() => <MessagesContainer/>}/>
                        <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                        <Route path='/users/friends' render={() => <FriendsContainer/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/apps/ticTacToe' render={() => <TicTacToeContainer/>}/>
                        <Route path='/apps' render={() => <Apps/>}/>
                        <Route path='/login' render={() => <LoginContainer/>}/>
                        <Route path='/' render={() => <Redirect to='/profile'/>}/>
                    </Switch>
                </div> :
                <div className={styles.preloader}>
                    <img src={preloaderLarge} alt='...'/>
                </div>
            }

        </div>

    );
}

const mapStateToProps = (state) => {
    return {
        isInitialized: state.app.isInitialized,
        errorMessage: state.app.errorMessage
    }
}

export default connect(mapStateToProps, {initializeApp})(App);
