import React from "react";
import styles from './Header.module.css';
import logo from '../../imgs/moon.svg';
import buttonStyle from '../../assets/button.module.css'
import {NavLink} from "react-router-dom";
import preloaderSmall from '../../imgs/preloaderSmall.svg';

const Header = ({isAuth, logOutUser, logining}) => {

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <img src={logo}/>
            </div>
            {isAuth ?
                <div className={buttonStyle.button + ' ' + buttonStyle.loginButton}
                     onClick={() => logOutUser()}>
                    {logining ?
                        <img src={preloaderSmall} /> :
                        <>
                            <div>Log</div>
                            <div>Out</div>
                        </>
                    }

                </div> :
                <NavLink to={'/login'}>
                    <div className={buttonStyle.button + ' ' + buttonStyle.loginButton}>
                        <div>Log</div>
                        <div>In</div>
                    </div>
                </NavLink>
            }

        </div>
    )
}

export default Header;