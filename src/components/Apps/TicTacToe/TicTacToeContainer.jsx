import React from "react";
import TicTacToe from "./TicTacToe";
import {connect} from "react-redux";
import {changePlayer, playAgain, setValues, startGame} from "../../../Redux/ticTacToe-reducer";
// import styles from './Header.module.css'

const TicTacToeContainer = (props) => {
    const calculateWinner = () => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (props.values[a] && props.values[a] === props.values[b] && props.values[a] === props.values[c]) {
                return [props.values[a], lines[i]];
            }
        }
        return [null, []];
    }
    const winner = calculateWinner();

    const handleOnClick = (id) => {
        if (props.turn === null || props.values[id] || winner[0]) return;
        props.setValues(id);
        props.changePlayer()
    }
    const startGame = () => {
        props.startGame();
    }
    return (
        <TicTacToe values={props.values}
                   turn={props.turn}
                   handleOnClick={handleOnClick}
                   startGame={startGame}
                   winner={winner}
                   playAgain={props.playAgain}/>
    )
}

const mapStateToProps = (state) => {
    return {
        values: state.ticTacToePage.values,
        turn: state.ticTacToePage.turn
    }
}

export default connect(mapStateToProps, {
    setValues,
    startGame,
    changePlayer,
    playAgain
})(TicTacToeContainer);