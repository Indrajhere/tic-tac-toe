import React  from "react"
import useTictactoe from "../hooks/useTictactoe";

interface TictactoeProps {
    size : number;
}

function Tictactoe({size}: TictactoeProps) {

    const initialBoard: null[] = Array(size*size).fill(null);
    const { board, handleClick,  resetGame, getStatusMessage } = useTictactoe({ initialBoard, size });

    return (
        <div className="game" style={{maxWidth:`calc(${size * 100}px)`}}>
            <div className="status">
                {getStatusMessage()}
                <button onClick={resetGame} className="reset">Reset Game</button>
            </div>
            <div className="board" style = {{gridTemplateColumns:`repeat(${size},1fr)`}}>
                {board.map((b, index) => {
                    return <button
                        disabled = {b !== null}
                        onClick={() => { handleClick(index) }}
                        className="cell"
                        key={index}>
                        {board[index]}
                    </button>
                })}
            </div>


        </div>
    )
}

export default Tictactoe;
