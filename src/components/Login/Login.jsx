import React, {useState} from "react";
import {Field, reduxForm} from "redux-form";
import {Element} from '../common/FormsControl/FormsControl';
import buttonStyle from '../../assets/button.module.css';
import styles from './Login.module.css';
import {required} from "../../utils/Validators/Validators";
import preloaderSmall from '../../imgs/preloaderSmall.svg';
import arrow from '../../imgs/arrow.svg';
import cn from 'classnames';

const Input = Element('input');
const Login = ({captchaUrl, handleSubmit, error, logining}) => {
    const [annotation, setAnnotation] = useState(false);
    return (
        <div className={styles.loginContainer}>
            <div className={styles.annotation}>
                {annotation ?
                    <button className={cn(buttonStyle.button, buttonStyle.loginAnnotationButton)}
                            onClick={() => setAnnotation(false)}>Info <img src={arrow}
                                                                           style={{transform: 'rotate(270deg)'}}/></button> :
                    <button className={cn(buttonStyle.button, buttonStyle.loginAnnotationButton)}
                            onClick={() => setAnnotation(true)}>Info <img src={arrow}
                                                                          style={{transform: 'rotate(90deg)'}}/></button>
                }
                {annotation && <div className={styles.annotationText}>
                    You can use this login and password to test the application.
                    <div>Login: <b>free@samuraijs.com</b></div>
                    <div>Password: <b>free</b></div>
                </div>}
            </div>
            {logining && <img src={preloaderSmall} className={styles.preloader}/> }
            <form onSubmit={handleSubmit}>
                <div className={styles.loginTitle}>Login</div>
                <div className={styles.emailPassForm}>
                    <Field name='email'
                           component={'input'}
                           validate={[required]}
                           placeholder={'email'}/>
                    <Field name='password'
                           component={'input'}
                           validate={[required]}
                           type='password'
                           placeholder={'password'}/>
                </div>
                {captchaUrl && <div className={styles.captha}>
                    <img src={captchaUrl} />
                    <Field name='captcha'
                           component={'input'}
                           validate={[required]}
                           placeholder={'enter your captcha'}/>
                </div>}
                <div className={styles.rememberMeForm}>
                    <Field name='rememberMe'
                           component={Input}
                           type={'checkbox'}/>
                    <div>Remember me</div>
                </div>
                <button className={buttonStyle.button + ' ' + buttonStyle.loginButtonSmall}
                        disabled={logining}>Login</button>
                {error && <div className={styles.error}>{error}</div>}
            </form>
        </div>
    )
}

export default reduxForm({form: 'login'})(Login);