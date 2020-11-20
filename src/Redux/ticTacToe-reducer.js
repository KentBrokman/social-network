
const SET_VALUES = 'SET_VALUES';
const START_GAME = 'START_GAME';
const CHANGE_PLAYER = 'CHANGE_PLAYER';
const PLAY_AGAIN = 'PLAY_AGAIN';

const initialState = {
    values: Array(9).fill(null),
    turn: null
}

const ticTacToeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VALUES: {
            return {
                ...state,
                values: state.values.map((item, index) => {
                    if (index === action.id) {
                        return state.turn
                    } else {
                        return item
                    }
                })
            }
        }
        case START_GAME: {
            return {
                ...state,
                turn: 'X'
            }
        }
        case PLAY_AGAIN: {
            return {
                ...state,
                values: Array(9).fill(null),
                turn: 'X'
            }
        }
        case CHANGE_PLAYER: {
            debugger
            return {
                ...state,
                turn: state.turn === 'X' ? 'O' : 'X'
            }
        }
        default: {
            return state
        }
    }
}

export const setValues = (id) => ({type: SET_VALUES, id});
export const startGame = () => ({type: START_GAME});
export const changePlayer = () => ({type: CHANGE_PLAYER});
export const playAgain = () => ({type: PLAY_AGAIN});



export default ticTacToeReducer;