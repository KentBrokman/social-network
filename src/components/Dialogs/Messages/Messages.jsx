import React, {useEffect, useRef} from "react";
import styles from './Messages.module.css';
import buttonStyle from '../../../assets/button.module.css';
import arrow from '../../../imgs/arrow.svg';
import preloader from "../../../imgs/preloaderLarge.svg";
import cn from 'classnames';
import {NavLink, Redirect} from "react-router-dom";
import MessageForm from "./MessageForm";
import {reset} from "redux-form";
import preloaderSmall from '../../../imgs/preloaderSmall.svg';


const Messages = ({sendMessage, interlocutorImg, interlocutorName, messages, authId, interlocutorId, messageIsSending}) => {

    const divRef = useRef(null);

    useEffect(() => {
        divRef.current.scrollIntoView({behavior: 'auto'});
    }, [messages]);

    const onSubmit = (formData, dispatch) => {
        sendMessage(interlocutorId, formData.newMessage);
        dispatch(reset('messageFrom'))
    }
    // if(!messages) return (
    //     <div className={styles.messagesContainer}>
    //         <img src={preloader} alt={'...'} />
    //     </div>
    // )
    return (
        <div className={styles.messagesContainer}>
            <div className={styles.messages}>
                <div className={styles.messagesHeader}>
                    <div className={styles.navSide}>
                        <NavLink to={'/dialogs'}>
                            <button className={buttonStyle.button + ' ' + buttonStyle.messagesArrowButton}>
                                <img src={arrow} style={{transform: 'rotate(180deg)'}}/>
                            </button>
                        </NavLink>
                        <NavLink to={`/profile/${interlocutorId}`}
                                 className={styles.messagesHeaderBody}>
                            <img alt={'intImg'}
                                 src={interlocutorImg}
                                 className={styles.interlocutorImg}/>
                            <div className={styles.interlocutorName}>{interlocutorName}</div>
                        </NavLink>
                    </div>
                    {messageIsSending && <img src={preloaderSmall} />}
                </div>
                <div className={styles.messagesBody}>
                    <div className={styles.messagesBodyInner}>
                        <div ref={divRef}
                             className={styles.refElem}></div>
                        {messages.map(message => {
                            return (
                                <div className={cn({[styles.authMessage]: message.senderId === authId}, styles.message)}
                                     key={message.id}>
                                    {message.body}
                                </div>
                            )
                        }).reverse()}
                    </div>
                </div>
                <MessageForm onSubmit={onSubmit}
                             messageIsSending={messageIsSending}/>
            </div>
        </div>
    )
}

export default Messages;