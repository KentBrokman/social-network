import React, {useEffect} from "react";
import Messages from "./Messages";
import {connect} from "react-redux";
import {clearMessages, getMessages, sendMessage} from "../../../Redux/dialogs-reducer";
import {compose} from "redux";
import {Redirect, withRouter} from "react-router-dom";
import {reduxForm} from "redux-form";
import randomUser from '../../../imgs/randomUser1.png'
import styles from "./Messages.module.css";
import preloader from "../../../imgs/preloaderLarge.svg";


const MessagesContainer = (props) => {
    const interlocutorId = props.match.params.userId;
    useEffect(() => {
        props.getMessages(interlocutorId);
        return function cleanUp() {
            props.clearMessages();
        }
    }, []);
    if (!props.dialogs) return <Redirect to='/dialogs' />
    if(!props.messages) return (
        <div className={styles.messagesContainer}>
            <img src={preloader} alt={'...'} />
        </div>
    )

    const interlocutorData = props.dialogs.find(dialog => dialog.id === +interlocutorId);
    const interlocutorImg = interlocutorData.photos.small || randomUser;
    const interlocutorName = interlocutorData.userName;

    return (
        <Messages sendMessage={props.sendMessage}
                  interlocutorImg={interlocutorImg}
                  interlocutorName={interlocutorName}
                  messages={props.messages}
                  authId={props.authId}
                  interlocutorId={interlocutorId}
                  messageIsSending={props.messageIsSending}/>
    )
}

const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        authId: state.auth.userId,
        messageIsSending: state.dialogsPage.messageIsSending
    }
}

export default compose(
    connect(mapStateToProps, {
        sendMessage,
        getMessages,
        clearMessages
    }),
    withRouter
)(MessagesContainer);