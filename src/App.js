import { useState } from "react";

function Square({value, onSquareClick}){
    return <button className="square"
        onClick={onSquareClick}>{value}</button>;
}

function checkWinner(squares){
    for (let i=0; i<squares.length; i++){
    }
}

export default function Board() {

    const [turn, setTurn] = useState('X');
    const [squares, setSquares] = useState(Array(9).fill(null));

    function handleClick(i){
        const nextSquares = squares.slice();

        if (!nextSquares.includes(null)){
            checkWinner(nextSquares);
            return
        }

        if (nextSquares[i]==null){
            if (turn=='X'){
                nextSquares[i] = 'X';
                setTurn('O');
            } else if (turn=='O'){
                nextSquares[i] = 'O';
                setTurn('X');
            }
        }

        setSquares(nextSquares);
    }

    function handleClear(){
        const nextSquares = squares.slice();
        for (let i=0; i<nextSquares.length; i++){
            nextSquares[i] = null;
        }
        setSquares(nextSquares);
    }

    return (<>
        <button className="clear" onClick={handleClear}>clear</button>
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
        </>)
}

