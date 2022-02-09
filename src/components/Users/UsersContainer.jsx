import React, {useEffect} from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {followUser, getFriends, getUsers, unfollowUser} from "../../Redux/users-reducer";
import preloaderLarge from '../../imgs/preloaderLarge.svg'
import {compose} from "redux";
import {Redirect, withRouter} from "react-router-dom";
import {startDialog} from "../../Redux/dialogs-reducer";

const UsersContainer = (props) => {
    useEffect(() => {
        props.getUsers(props.pageSize, props.pageNumber)
    }, [props.pageNumber]);
    if(!props.isAuth) return <Redirect to='/login' />
    const onPageChange = (p) => {
        props.getUsers(props.pageSize, p)
    }
    const onStartChatting = (userId) => {
        props.startDialog(userId).then(() => props.history.push(`/dialogs/messages/${userId}`));
    }
    return (
        <>
            {(props.totalUsersCount && props.users) !== null ?
                <Users users={props.users}
                       unfollowUser={props.unfollowUser}
                       followUser={props.followUser}
                       togglingFollowIds={props.togglingFollowIds}
                       totalUsersCount={props.totalUsersCount}
                       pageSize={props.pageSize}
                       onPageChange={onPageChange}
                       pageNumber={props.pageNumber}
                       onStartChatting={onStartChatting}
                       getFriends={props.getFriends}
                       isFetching={props.isFetching}
                /> :
                <div style={{height: '100%',
                             display: 'flex',
                             justifyContent: 'center',
                             alignItems: 'center'}}>
                    <img src={preloaderLarge} />
                </div>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        pageNumber: state.usersPage.pageNumber,
        togglingFollowIds: state.usersPage.togglingFollowIds,
        totalUsersCount: state.usersPage.totalUsersCount,
        isAuth: state.auth.isAuth,
        isFetching: state.usersPage.isFetching
    }
}

export default compose(
    connect(mapStateToProps, {
        getUsers,
        unfollowUser,
        followUser,
        startDialog,
        getFriends
    }),
    withRouter
)(UsersContainer);