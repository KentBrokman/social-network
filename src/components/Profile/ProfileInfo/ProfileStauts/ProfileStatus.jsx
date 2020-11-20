import React, {useEffect, useState} from "react";
import styles from './ProfileStatus.module.css'

const ProfileStatus = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }
    const onStatusChange = (e) => {
        setStatus(e.target.value)
    }

    return (
        <div className={styles.profileStatus}>
            {props.authUserId === props.urlUserId ?
                <>
                    {!editMode && <div className={styles.status}
                                       onClick={activateEditMode}>{props.status || '----'}</div>}
                    {editMode && <input onBlur={deactivateEditMode}
                                        onChange={onStatusChange}
                                        value={status}
                                        autoFocus={true}/>}
                </> :
                <>
                    {props.status || '----'}
                </>
            }

        </div>
    )
}

export default ProfileStatus;