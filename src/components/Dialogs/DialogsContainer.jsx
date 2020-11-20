import React, {useEffect} from "react";
import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import {getDialogs, startDialog} from "../../Redux/dialogs-reducer";
import {Redirect} from "react-router-dom";



const DialogsContainer = (props) => {
    useEffect(() => {
        props.getDialogs()
    }, [])
    if (!props.isAuth) return <Redirect to='/login' />
    return (
        <Dialogs startDialog={props.startDialog}
                 dialogs={props.dialogs}/>
    )
}

const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {
    startDialog,
    getDialogs
})(DialogsContainer);