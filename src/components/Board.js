import React, { useState } from 'react';
import Square from './Square';
import './Board.css';

function Board() {
    let status;
    let result;
    const [squares, setSquares] = useState(Array.from({ length: 9 }, () => null));
    const [xIsNext, setXIsNext] = useState(true);

    function handleClick(i) {
        // Verify if the square has been marked
        if (squares[i] || determineWinner(squares)) {
            return; // Do nothing, return early.
        }
        // Copy current squares array into nextSquares
        const nextSquares = squares.slice();
        // Assign 'X' or 'O' based on the player's turn
        nextSquares[i] = xIsNext ? 'X' : 'O'; // shorthand notation for if ... else
        // Update the squares with the new value
        setSquares(nextSquares);
        // Switch the turn to the next player
        setXIsNext(!xIsNext);
    }

    function determineWinner(squares) {
        // Enumerate the potential winning configurations
        // (horizontal rows, vertical columns, and diagonal lines)
        const winningLines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        // Perform an iteration over every successful combination
        for (const [a, b, c] of winningLines) {
            // Verify that the squares at coordinates a, b, and c
            // have identical non-null values (either 'X' or 'O')
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]; // Return the winner's symbol
            }
        }
        return null; // Return null if no winner could be found
    }

    // determine a winner
    const winner = determineWinner(squares);
    // Check to identify if there is a game winner
    if (winner) {
        status = "Winner: " + winner; // Update status with the winner's symbol
        result = newGame(); // Start a new game
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O"); // Update status of next player turn
    }
    // Resets the game to its initial state.
    function onStartOver() {
        // Reset the squares array to an array of 9 null values
        setSquares(Array(9).fill(null));

        // Set the next player to 'X'
        setXIsNext(true);
    }
    // Generates a button to start a new game
    // @returns {JSX.Element} A button element to start a new game when clicked
    function newGame() {
        return (
            // Button element to start a new game
            <button type="button" className="btn btn-outline-dark btn-sm" onClick={onStartOver}>
                Start over?
            </button>
        );
    }

    return (
        <>
            {/* Content Section */}
            <div className="container gameContainer">
                <div className="card mb-3">
                    <h3 className="card-header">Play Tic-Tac-Toe</h3>
                    <div className="card-body">
                        <h5 className="card-title">This game supports two players.</h5>
                        <h6 className="card-subtitle text-muted">To start, click on the squares.</h6>
                    </div>
                    <div className="card-body">
                        <div className="board-row">
                            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
                        </div>
                        <div className="board-row">
                            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
                        </div>
                        <div className="board-row">
                            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        <p>{status}
                            &nbsp;
                            &nbsp;
                            {result}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Board;