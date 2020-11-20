import React, {useState} from "react";
import styles from './Users.module.css';
import buttonStyles from '../../assets/button.module.css';
import randomUser from '../../imgs/randomUser1.png';
import {Paginator} from "../common/Paginator/Paginator";
import {NavLink} from "react-router-dom";
import preloaderSmall from '../../imgs/preloaderSmall.svg';

const Users = ({
                   users, unfollowUser, followUser, togglingFollowIds,
                   totalUsersCount, pageSize, onPageChange, pageNumber, onStartChatting, getFriends, isFetching
               }) => {
    return (
        <div className={styles.users}>
            <NavLink to='/users/friends'>
                <button className={styles.buttonFriends + ' ' + buttonStyles.button}
                        onClick={() => getFriends()}>Friends</button>
            </NavLink>
            {isFetching && <img src={preloaderSmall}
                          className={styles.preloader}/> }
            {/*<div className={styles.usersBar}>*/}
            {/*    */}
            {/*</div>*/}
            <Paginator totalUsersCount={totalUsersCount}
                       pageSize={pageSize}
                       onPageChange={onPageChange}
                       pageNumber={pageNumber}/>
            <div className={styles.usersList}>{users.map(user => {
                return (
                    <div key={user.name}
                         className={styles.user}>
                        <NavLink to={`/profile/${user.id}`}>
                            <div className={styles.userBody}>
                                <img className={styles.userPhoto}
                                     src={user.photos.small !== null ? user.photos.small : randomUser}
                                     alt='userPhoto'/>
                                <div className={styles.userDescription}>
                                    <div className={styles.userName}>{user.name}</div>
                                    <div className={styles.userStatus}>{
                                        !user.status ? <div className={styles.statusCap}>user status</div> :
                                        user.status.length > 34 ? user.status.slice(0, 33) + '...' :
                                        user.status
                                    }</div>
                                </div>
                            </div>
                        </NavLink>
                        <div className={styles.usersButtons}>
                            <button className={buttonStyles.button + ' ' + buttonStyles.startChattingButton}
                                    onClick={() => {
                                        onStartChatting(user.id)
                                    }}>Start chatting
                            </button>
                            {user.followed ?
                                <button className={buttonStyles.button + ' ' + buttonStyles.followButton}
                                        disabled={togglingFollowIds.some(id => id === user.id)}
                                        onClick={() => unfollowUser(user.id)}>
                                    Unfollow
                                </button> :
                                <button className={buttonStyles.button + ' ' + buttonStyles.followButton}
                                        disabled={togglingFollowIds.some(id => id === user.id)}
                                        onClick={() => followUser(user.id)}>
                                    Follow
                                </button>
                            }
                        </div>
                    </div>
                )
            })}</div>
        </div>
    )
}

export default Users;