import React from "react";
import styles from './Dialogs.module.css';
import preloader from '../../imgs/preloaderLarge.svg';
import randomUser from '../../imgs/randomUser1.png';
import {NavLink} from "react-router-dom";

const Dialogs = ({dialogs}) => {

    if (!dialogs) return (
        <div className={styles.dialogsContainer}>
            <img src={preloader} alt={'...'}/>
        </div>
    )
    return (
        <div className={styles.dialogsContainer}>
            <div className={styles.dialogs}>
                {dialogs.map(dialog => {
                    return (
                        <NavLink to={`/dialogs/messages/${dialog.id}`} key={dialog.userName}>
                            <div className={styles.dialog}>
                                <div className={styles.dialogBody}>
                                    <img alt={'userImg'}
                                         src={dialog.photos.small ? dialog.photos.small : randomUser}/>
                                    <div className={styles.dialogDescription}>
                                        <div className={styles.dialogName}>
                                            {dialog.userName}
                                        </div>
                                        <div className={styles.dialogMessInfo}>
                                            {+dialog.newMessagesCount === 0 ? 'You dont have new messages' :
                                                `You have ${dialog.newMessagesCount} new messages`
                                            }
                                        </div>
                                    </div>
                                </div>
                                {+dialog.newMessagesCount === 0 ? <div></div> :
                                    <div className={styles.dialogNewMessCount}>
                                        {dialog.newMessagesCount}
                                    </div>
                                }
                            </div>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}

export default Dialogs;