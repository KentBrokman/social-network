import React from "react";
import {NavLink} from "react-router-dom";
import ticTacToe from '../../imgs/ticTacToe.jpg';
import styles from './Apps.module.css'

const Apps = () => {
    return (
        <div className={styles.appsContainer}>
            <div className={styles.apps}>
                <NavLink to='/apps/ticTacToe'>
                    <div className={styles.app}>
                        <div>
                            <img src={ticTacToe}/>
                        </div>
                        <div className={styles.appTitle}>Tic Tac Toe</div>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default Apps;