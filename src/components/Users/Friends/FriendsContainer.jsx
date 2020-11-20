import React, {useEffect} from "react";
import {connect} from "react-redux";
import {followUser, getFriends, unfollowUser} from "../../../Redux/users-reducer";
import preloaderLarge from '../../../imgs/preloaderLarge.svg'
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {startDialog} from "../../../Redux/dialogs-reducer";
import Friends from "./Friends";

const FriendsContainer = (props) => {
    useEffect(() => {
        props.getFriends()
    }, [props.togglingFollowIds]);

    const onStartChatting = (userId) => {
        props.startDialog(userId).then(() => props.history.push(`/dialogs/messages/${userId}`));
    }
    debugger
    return (
        <>
            {(props.friends) !== null ?
                <Friends friends={props.friends}
                       unfollowUser={props.unfollowUser}
                       followUser={props.followUser}
                       togglingFollowIds={props.togglingFollowIds}
                       onStartChatting={onStartChatting}/> :
                <div style={{height: '100%',
                             display: 'flex',
                             justifyContent: 'center',
                             alignContent: 'center'}}>
                    <img src={preloaderLarge} />
                </div>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        friends: state.usersPage.friends,
        togglingFollowIds: state.usersPage.togglingFollowIds,
        totalUsersCount: state.usersPage.totalUsersCount,
    }
}

export default compose(
    connect(mapStateToProps, {
        getFriends,
        unfollowUser,
        followUser,
        startDialog
    }),
    withRouter
)(FriendsContainer);