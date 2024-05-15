import React from "react"
import useTictactoe from "../hooks/useTictactoe";
import useBoardSize from "../hooks/useBoardSize";

function Tictactoe() {

    const { size, finalSize, isError, isSizeValidated, handleSizeChange, handleFinalSizeOnEnterClick } = useBoardSize();
    const initialBoard: null[] = Array(finalSize * finalSize).fill(null);
    const { board, handleClick, resetGame, getStatusMessage } = useTictactoe({ size: finalSize, initialBoard });
    // console.log('initialboard: ',initialBoard);
    // console.log('board: ',board);
    
    return (
        <div className="container">

            <h1 className="heading">Tic tac toe</h1>
            {!isSizeValidated ?
                <div className="input_container">
                    
                    <input className="size_input"
                        type="number"
                        value={size}
                        onChange={handleSizeChange}
                        placeholder="Enter board size as a integer..." />
                    {isError && <p>Board size is not valid</p>}
                    <button className="btn" onClick={handleFinalSizeOnEnterClick}>Enter</button>
                </div> :

                <div className="game" style={{ maxWidth: `calc(${finalSize * 100}px)` }}>
                    <div className="status">
                        {getStatusMessage()}
                        <button onClick={resetGame} className="reset">Reset Game</button>
                    </div>
                    <div className="board" style={{ gridTemplateColumns: `repeat(${finalSize},1fr)` }}>
                        {board.map((b, index) => {
                            return <button
                                disabled={b !== null}
                                onClick={() => { handleClick(index) }}
                                className="cell"
                                key={index}>
                                {board[index]}
                            </button>
                        })}
                    </div>


                </div>
            }
        </div>
    )
}

export default Tictactoe;
