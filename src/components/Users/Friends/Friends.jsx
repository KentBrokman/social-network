import React, {useState} from "react";
import styles from './Friends.module.css';
import buttonStyles from '../../../assets/button.module.css';
import randomUser from '../../../imgs/randomUser1.png';
import {NavLink} from "react-router-dom";

const Friends = ({friends, unfollowUser, followUser, togglingFollowIds, onStartChatting}) => {
    return (
        <div className={styles.friends}>
            <NavLink to='/users'>
                <button className={styles.buttonFriends + ' ' + buttonStyles.button}>All Users</button>
            </NavLink>
            <div className={styles.friendsList}>{friends.map(friend => {
                return (
                    <div key={friend.name}
                         className={styles.friend}>
                        <NavLink to={`/profile/${friend.id}`}>
                            <div className={styles.friendBody}>
                                <img className={styles.friendPhoto}
                                     src={friend.photos.small !== null ? friend.photos.small : randomUser}
                                     alt='userPhoto'/>
                                <div className={styles.friendDescription}>
                                    <div className={styles.friendName}>{friend.name}</div>
                                    <div className={styles.friendStatus}>{
                                        !friend.status ? <div className={styles.statusCap}>user status</div> :
                                        friend.status.length > 32 ? friend.status.slice(0, 31) + '...' :
                                        friend.status
                                    }</div>
                                </div>
                            </div>
                        </NavLink>
                        <div className={styles.friendsButtons}>
                            <button className={buttonStyles.button + ' ' + buttonStyles.startChattingButton}
                                    onClick={() => {
                                        onStartChatting(friend.id)
                                    }}>Start chatting
                            </button>
                            {friend.followed ?
                                <button className={buttonStyles.button + ' ' + buttonStyles.followButton}
                                        disabled={togglingFollowIds.some(id => id === friend.id)}
                                        onClick={() => unfollowUser(friend.id)}>
                                    Unfollow
                                </button> :
                                <button className={buttonStyles.button + ' ' + buttonStyles.followButton}
                                        disabled={togglingFollowIds.some(id => id === friend.id)}
                                        onClick={() => followUser(friend.id)}>
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

export default Friends;