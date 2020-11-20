import React, {useEffect} from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logOutUser} from "../../Redux/auth-reducer";


const HeaderContainer = (props) => {

    return (
        <Header isAuth={props.isAuth}
                logOutUser={props.logOutUser}
                logining={props.logining}/>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        logining: state.auth.logining
    }
}

export default connect(mapStateToProps, {logOutUser})(HeaderContainer);