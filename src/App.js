import React, {useState} from 'react';
import './App.css';

function Square({value, clickHandler}){
  return <button className='Square' onClick={clickHandler}>{value}</button>
}

function Board({isNext, squares, onPlay}){
  console.log(squares);
  // const [squares, setSquares] = useState(Array(9).fill(null));
  // const [isNext, setIsNext] = useState(true);
  const onClickBtn = (value) => {
    if(squares[value] || IsWinner(squares))
      return;
    let nextSquares = squares.slice();
    isNext === true ? nextSquares[value] = "X" : nextSquares[value] = "O";
    onPlay(nextSquares);
  };
  const winner = IsWinner(squares);
  let status;
  if(winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next Player: ' + (isNext ? 'X' : 'O');
  }

  return (
    <>
      <div className='Board'>
        {status}
      </div>
      <div className='Board'>
        <Square value={squares[0]} clickHandler = {() => onClickBtn(0)}/>
        <Square value={squares[1]} clickHandler = {() => onClickBtn(1)}/>
        <Square value={squares[2]} clickHandler = {() => onClickBtn(2)}/>
      </div>
      <div className='Board'>
        <Square value={squares[3]} clickHandler = {() => onClickBtn(3)}/>
        <Square value={squares[4]} clickHandler = {() => onClickBtn(4)}/>
        <Square value={squares[5]} clickHandler = {() => onClickBtn(5)}/>
      </div>
      <div className='Board'>
        <Square value={squares[6]} clickHandler = {() => onClickBtn(6)}/>
        <Square value={squares[7]} clickHandler = {() => onClickBtn(7)}/>
        <Square value={squares[8]} clickHandler = {() => onClickBtn(8)}/>
      </div>
    </>
  );
}

function IsWinner(squares){
  const winPairs = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for(let i = 0; i < winPairs.length; i ++)
  {
    const [a,b,c] = winPairs[i];
    if(squares[a] !== null && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }
  return null;
}

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const IsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if(move >  0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  })

  return (
    <>
      <div className="App">
        <Board isNext = {IsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </>
  );
}

export default App;
