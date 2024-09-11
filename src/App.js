import { useState } from "react";
import {Peer} from "https://esm.sh/peerjs@1.5.4?bundle-deps"

var peer = new Peer();

peer.on('open', function(id) {
    console.log("my id: ", id);
});

peer.on('connection', function(conn){
    console.log("connection peer id: ", conn.peer);
    conn.on('data', function(data){
	console.log("data received: ", data);
    });
});


function Square({value, onSquareClick}){
    return <button className="square"
        onClick={onSquareClick}>{value}</button>;
}

function checkWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], 
        [2, 4, 6]  
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

    let [peerId, setPeerId] = useState(null);

    function genPeer(){
        peer.on('open', function(id) {
            setPeerId(id);
        });
    }

    let [remotePeerId, setRemotePeerId] = useState("");

    function handleChange(event){
	setRemotePeerId(event.target.value);
	//console.log(val);
    }

    function handleSubmit(event){
	event.preventDefault();
	console.log("value submitted succesfully: ", remotePeerId);
	let conn = peer.connect(remotePeerId);
	let boardData = [
	    turn,
	    squares,
	    winner,
	    XScore,
	    OScore
	];
	conn.on('open', function(){
	    console.log("successful");
	    conn.send(boardData);
	});
    }

    return (<>
	    <h6 onLoad={genPeer()}>peer-id: {peerId}</h6>
	    <div>
	    <form type='submit' onSubmit={handleSubmit}>
	    <input type='text' placeholder='remote peer id' value={remotePeerId} onChange={handleChange}></input>
	    <button className="submit" type="submit">submit</button>
	    </form>
	    </div>
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
