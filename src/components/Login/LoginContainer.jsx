import React from "react";
import {connect} from "react-redux";
import Login from "./Login";
import {logInUser} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";

const LoginContainer = (props) => {
    const onSubmit = (formData) => {
        props.logInUser(formData);
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return (
        <Login onSubmit={onSubmit}
               captchaUrl={props.captchaUrl}
               logining={props.logining}/>
    )
}

const mapStateToProps = (state) => {

     return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth,
        logining: state.auth.logining
     }
}

export default connect(mapStateToProps, {logInUser})(LoginContainer);