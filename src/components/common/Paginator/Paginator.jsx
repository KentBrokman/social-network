import React, {useState} from "react";
import styles from './Paginator.module.css';
import arrowImg from '../../../imgs/arrow.svg';
import buttonStyle from '../../../assets/button.module.css';
import cn from 'classnames';


export const Paginator = ({totalUsersCount, pageSize, portionSize = 10, onPageChange, pageNumber}) => {
    const pages = [];
    const pagesCount = Math.ceil(totalUsersCount / pageSize);

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const portionsCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    const leftPortionBorder = (portionNumber - 1) * portionSize + 1;
    const portionRightBorder = portionNumber * portionSize;
    return (
        <div className={styles.paginator}>
            <button onClick={() => setPortionNumber(portionNumber - 1)}
                    disabled={portionNumber === 1}
                    className={cn(buttonStyle.button, buttonStyle.usersArrowButton)}>
                <img src={arrowImg} style={{transform: 'rotate(180deg)'}}/>
            </button>
            <div className={styles.pages}>
                {pages.filter(page => page >= leftPortionBorder && page <= portionRightBorder)
                    .map(p => {
                            return (
                                <div onClick={() => onPageChange(p)}
                                     key={p}
                                     className={cn({[styles.selectedPage]: p === pageNumber}, styles.page, {[styles.pageOver100]: p > 100})}>{p}</div>
                            )
                        }
                    )
                }
            </div>
            <button onClick={() => setPortionNumber(portionNumber + 1)}
                    disabled={portionNumber === portionsCount}
                    className={cn(buttonStyle.button, buttonStyle.usersArrowButton)}>
                <img src={arrowImg} />
            </button>
        </div>
    )
}