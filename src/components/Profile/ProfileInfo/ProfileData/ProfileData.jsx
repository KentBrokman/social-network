import React, {useEffect, useState} from "react";
import styles from './ProfileData.module.css'
import ProfileDataForm from "./ProfileDataForm";
import buttonStyle from "../../../../assets/button.module.css";
import arrowImg from "../../../../imgs/arrow.svg"

const ProfileData = ({profile, saveProfile, authUserId, urlUserId}) => {
    const [contactsDisplayed, displayContacts] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const toggleContacts = () => {
        displayContacts(!contactsDisplayed);
    }
    const activateEditMode = () => {
        setEditMode(true)
    }
    const onSubmit = (formData) => {
        saveProfile(formData).then(() => {
            setEditMode(false)
        })
    }

    return (
        <>
            {!editMode &&
            <div className={styles.profileData}>
                <div className={styles.aboutInfo}>
                    <div><b>About me:</b> {profile.aboutMe}</div>
                    <div><b>Looking for a job:</b> {profile.lookingForAJob ? 'Yes' : 'No'}</div>
                    <div><b>Description:</b> {profile.lookingForAJobDescription}</div>
                    <div className={styles.contactsTytle}><b>Contacts:</b> <button onClick={toggleContacts}
                                                 className={buttonStyle.button + ' ' + buttonStyle.arrowButton}>
                        {contactsDisplayed ?
                            <img src={arrowImg} style={{transform: 'rotate(180deg)'}}/> :
                            <img src={arrowImg} /> }
                    </button></div>
                    {authUserId === urlUserId &&
                        <>
                            <button onClick={activateEditMode}
                                    className={buttonStyle.button + ' ' + buttonStyle.editButton}>Edit</button>
                        </>
                    }
                </div>
                {contactsDisplayed &&
                <div className={styles.contacts}>
                    {Object.keys(profile.contacts).map(contact => <Contact contactType={contact}
                                                                           key={contact}
                                                                           contactValue={profile.contacts[`${contact}`]}/>)}
                </div>
                }
            </div>
            }
            {editMode && <ProfileDataForm profile={profile}
                                          initialValues={profile}
                                          onSubmit={onSubmit} />}
        </>

    )
}

const Contact = ({contactType, contactValue}) => {
    return (
        <div><b>{contactType}:</b> {contactValue}</div>
    )
}

export default ProfileData;