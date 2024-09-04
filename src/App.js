import { useState } from "react";

function Square({value, onSquareClick}){
    return <button className="square"
        onClick={onSquareClick}>{value}</button>;
}

function checkWinner(squares){
    const lines = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal
        [2, 4, 6]  // Diagonal
    ];
    
    for (let [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [true, squares[a]];
        }
    }
    return [false, null];
}

export default function Board() {

    const [turn, setTurn] = useState('X');
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [winner, setWinner] = useState(null);

    function handleClick(i){
        if (squares[i] || winner) return;

        const nextSquares = squares.slice();
        nextSquares[i] = turn

        let [someWin, whoWin] = checkWinner(nextSquares);
        if(someWin){
            setWinner(whoWin);
        } else {
            setTurn(turn === 'X' ? 'O' : 'X');
        }

        setSquares(nextSquares);
    }

    function handleClear(){
        const nextSquares = Array(9).fill(null);
        setWinner(null);
        setSquares(nextSquares);
    }

    return (<>
        <p>winner: {winner}</p>
        <p>turn: {turn}</p>
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
        <button className="clear" onClick={handleClear}>clear</button>
        </>)
}
