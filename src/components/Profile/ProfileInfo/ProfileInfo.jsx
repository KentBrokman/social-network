import React from "react";
import styles from './ProfileInfo.module.css'
import userPhoto from '../../../imgs/randomUser1big.png';
import ProfileStatus from "./ProfileStauts/ProfileStatus";
import ProfileData from "./ProfileData/ProfileData";
import preloaderSmall from '../../../imgs/preloaderSmall.svg';

const ProfileInfo = ({profile, status, updateStatus, savePhoto, saveProfile, authUserId, urlUserId, isFetching}) => {
    const onMainPhotoSelected = (e) => {
        if(e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    return (
        <div className={styles.profileInfo}>
            {isFetching && <img src={preloaderSmall}
                                className={styles.preloader}/>}
            <div className={styles.mainInfo}>
                <div className={styles.ava}>
                    <div className={styles.photo}>
                        <img src={profile.photos.large || userPhoto} alt='photo'/>
                    </div>
                    {authUserId === urlUserId &&
                        <>
                            <input type='file'
                                   id='file'
                                   className={styles.file} onChange={onMainPhotoSelected}/>
                            <label htmlFor='file' className={styles.setPhotoButton}>
                                <div className={styles.buttonText}>&hellip;</div>
                            </label>
                        </>
                    }

                </div>
                <div className={styles.nikName}>{profile.fullName}</div>
                <ProfileStatus status={status}
                               updateStatus={updateStatus}
                               authUserId={authUserId}
                               urlUserId={urlUserId}/>
            </div>
            <ProfileData profile={profile}
                         saveProfile={saveProfile}
                         authUserId={authUserId}
                         urlUserId={urlUserId}/>
            {/*<div className={styles.profileData}>extraInfo</div>*/}
        </div>
    )
}

export default ProfileInfo;