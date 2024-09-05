import { useState } from "react";
import {Peer} from "https://esm.sh/peerjs@1.5.4?bundle-deps"

var peer = new Peer();

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
    const [XScore, setXScore] = useState(0);
    const [OScore, setOScore] = useState(0);

    function handleClick(i){
        if (squares[i] || winner) return;

        const nextSquares = squares.slice();
        nextSquares[i] = turn

        let [someWin, whoWin] = checkWinner(nextSquares);
        if(someWin){
            if(whoWin==='X'){
                setXScore(score => score + 1);
            }
            if(whoWin==='O'){
                setOScore(score => score + 1);
            }
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

    function handleReset(){
        setXScore(0)
        setOScore(0)
    }

    let [peerid, setPeerId ] = useState(null);

    function genPeer(){
        peer.on('open', function(id) {
            setPeerId(id);
        });
    }

    let [submitPeerId, setSubmitPeerId] = useState("");

    const handleChange = (event) => {
        //console.log(event.target.value);
        setSubmitPeerId(event.target.value);
    }

    const handleSubmit = (event) => {
        //event.preventDefaault();
        console.log(submitPeerId);
    }

    return (<>
        <h6 onLoad={genPeer()}>peer-id: {peerid}</h6>
        <form onSubmit={handleSubmit}>
        <input type='form' placeholder="enter peer id" value={submitPeerId} onChange={handleChange}></input>
        <button className="submit">submit</button>
        </form>
        <hr></hr>
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
        <div>
        <button className="clear" onClick={handleClear}>clear</button>
        <button className="reset" onClick={handleReset}>reset</button>
        </div>
        <table style={{ width: '25%', borderCollapse: 'collapse' }}>
        <thead>
        <tr>
        <th style={{ border: '1px solid #ddd', padding: '8px' }}>X</th>
        <th style={{ border: '1px solid #ddd', padding: '8px' }}>O</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{XScore}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{OScore}</td>
        </tr>
        </tbody>
        </table>
        </>)
}
