import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, updateStatus, savePhoto, saveProfile} from "../../Redux/profile-reducer";
import {removeErrorMessage} from "../../Redux/app-reducer";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import preloaderLarge from "../../imgs/preloaderLarge.svg";


const ProfileContainer = (props) => {
    let userId = props.match.params.userId;
    if (!userId) {
        userId = props.authUserId;
        if (!userId) {
            props.history.push('/login')
        }
    }
    useEffect(() => {
        props.getProfile(userId)
        props.getStatus(userId)
    }, [userId])
    return (
        <>
            {!props.profile ?
                <div style={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center'
                }}>
                    <img src={preloaderLarge}/>
                </div> :
                +props.profile.userId === +userId ?
                    <Profile profile={props.profile}
                             status={props.status}
                             updateStatus={props.updateStatus}
                             savePhoto={props.savePhoto}
                             saveProfile={props.saveProfile}
                             errorMessage={props.errorMessage}
                             removeErrorMessage={props.removeErrorMessage}
                             authUserId={props.authUserId}
                             urlUserId={userId}
                             isFetching={props.isFetching}/> :
                    <div style={{
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center'
                    }}>
                        <img src={preloaderLarge}/>
                    </div>

            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        errorMessage: state.app.errorMessage,
        authUserId: state.auth.userId,
        isFetching: state.profilePage.isFetching
    }
}

export default compose(
    connect(mapStateToProps, {
        getProfile,
        getStatus,
        updateStatus,
        savePhoto,
        saveProfile,
        removeErrorMessage
    }),
    withRouter
)(ProfileContainer)

// export default connect(mapStateToProps, {
//     getProfile,
//     getStatus,
//     updateStatus,
//     savePhoto,
//     saveProfile,
//     removeErrorMessage
// })(ProfileContainer);