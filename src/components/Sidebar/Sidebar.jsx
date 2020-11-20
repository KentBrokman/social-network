import React from "react";
import styles from './Sidebar.module.css'
import {NavLink} from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import FriendsSide from "./FriendsSide/FriendsSide";

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <Navbar/>
            <div className={styles.line}></div>
            <FriendsSide />
        </div>
    )
}

export default Sidebar;