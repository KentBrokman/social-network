import React from "react";
import styles from './TicTacToe.module.css';
import buttonStyle from '../../../assets/button.module.css';
import cn from 'classnames';

const TicTacToe = ({values, handleOnClick, startGame, winner, turn, playAgain}) => {
    return (
        <div className={styles.ticTacToeContainer}>
            {!turn ? <button onClick={() => startGame()}
                             className={cn(buttonStyle.button, buttonStyle.startGameButton)}>Start game</button> :
                <button onClick={() => playAgain()}
                        className={cn(buttonStyle.button, buttonStyle.startGameButton)}>Restart</button>
            }

            <table className={styles.board}>
                <tr className={styles.boardRow}>
                    <Square id={0}
                            value={values[0]}
                            handleOnClick={handleOnClick}
                            winner={winner}/>
                    <Square id={1}
                            value={values[1]}
                            handleOnClick={handleOnClick}
                            winner={winner}/>
                    <Square id={2}
                            value={values[2]}
                            handleOnClick={handleOnClick}
                            winner={winner}/>
                </tr>
                <tr className={styles.boardRow}>
                    <Square id={3}
                            value={values[3]}
                            handleOnClick={handleOnClick}
                            winner={winner}/>
                    <Square id={4}
                            value={values[4]}
                            handleOnClick={handleOnClick}
                            winner={winner}/>
                    <Square id={5}
                            value={values[5]}
                            handleOnClick={handleOnClick}
                            winner={winner}/>
                </tr>
                <tr className={styles.boardRow}>
                    <Square id={6}
                            value={values[6]}
                            handleOnClick={handleOnClick}
                            winner={winner}/>
                    <Square id={7}
                            value={values[7]}
                            handleOnClick={handleOnClick}
                            winner={winner}/>
                    <Square id={8}
                            value={values[8]}
                            handleOnClick={handleOnClick}
                            winner={winner}/>
                </tr>
            </table>
            <div className={styles.description}>
                {turn && !winner[0] && values.some(item => item === null) && <div>Turn: {turn}</div>}
                {winner[0] && <div>Winner: {winner[0]}</div>}
                {!values.some(item => item === null) && !winner[0] && <div>Draw</div>}
                {!turn && <div>Let's play!</div>}
            </div>
        </div>
    )
}

const Square = ({id, value, handleOnClick, winner}) => {
    return (
        <td className={cn(styles.square, {[styles.winner]: winner[1].some(item => item === id)})}
             onClick={() => handleOnClick(id)}>{value}</td>
    )
}

export default TicTacToe;