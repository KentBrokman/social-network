import React from "react";
import styles from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";

const Profile = ({profile, status, updateStatus, savePhoto,
                     saveProfile, errorMessage, removeErrorMessage, authUserId, urlUserId, isFetching}) => {
    return (
        <div className={styles.profile}>
            <ProfileInfo profile={profile}
                         status={status}
                         updateStatus={updateStatus}
                         savePhoto={savePhoto}
                         saveProfile={saveProfile}
                         authUserId={authUserId}
                         urlUserId={urlUserId}
                         isFetching={isFetching}/>
            <div className={styles.line}></div>
            <PostsContainer />
            {errorMessage &&
            <div className={styles.error}>
                <div className={styles.errorInner}>
                    <div>{errorMessage}</div>
                    <div className={styles.errorButton}>
                        <button onClick={removeErrorMessage}>&#x274C;</button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Profile;