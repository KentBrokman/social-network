import React from "react";
import styles from './Navbar.module.css'
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <NavLink to={'/profile'}
                     activeClassName={styles.active}>
                <div className={styles.text}>Profile</div>
            </NavLink>
            <NavLink to={'/dialogs'}
                     activeClassName={styles.active}>
                <div className={styles.text}>Dialogs</div>
            </NavLink>
            <NavLink to={'/users'}
                     activeClassName={styles.active}>
                <div className={styles.text}>Users</div>
            </NavLink>
            <NavLink to={'/apps'}
                     activeClassName={styles.active}>
                <div className={styles.text}>Apps</div>
            </NavLink>
        </div>
    )
}

export default Navbar;