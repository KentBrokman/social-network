import React, {useEffect, useRef, useState} from "react";
import buttonStyle from '../../../assets/button.module.css';
import {Field, reduxForm} from "redux-form";
import styles from "./Messages.module.css";
import {required} from "../../../utils/Validators/Validators";


const MessageForm = ({handleSubmit, messageIsSending}) => {

    return (
        <form className={styles.messagesForm}
              onSubmit={handleSubmit}>
            <div className={styles.formInner}>
                <Field name={'newMessage'}
                       type='text'
                       component={'textarea'}
                       validate={[required]}
                       onKeyPress={e => {if (e.key === 'Enter') {
                           e.preventDefault();
                           handleSubmit()
                       }}} />
            </div>
            <button className={buttonStyle.button + ' ' + buttonStyle.sendMessageButton}
                    type='submit'
                    disabled={messageIsSending}>Send message</button>
        </form>
    )

}

export default reduxForm({form: 'messageFrom'})(MessageForm);