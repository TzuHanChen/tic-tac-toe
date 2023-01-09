import React, { useState } from 'react';

function Status({ xIsNext, squares }) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return(<h2 className="status">{status}</h2>);
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  let threeSquare = [], threeRow = [];
  for (let i = 0; i < 3; i++) {
    threeSquare = [];
    for (let j = 0; j < 3; j++) {
      threeSquare.push(<Square value={squares[i*3+j]} 
        onSquareClick={() => handleClick(i*3+j)} />);
    }
    threeRow.push(<div className="board-row">{threeSquare}</div>);
  }
  return (<div className="board">{threeRow}</div>);
}

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move === currentMove) {
      description = <li key={move} className="current">
        You are at move #{move}</li>;
    } else if (move === 0) {
      description = <li key={move}>
        <button className="move" onClick={() => jumpTo(move)}>
          Go to game start</button></li>;
    } else {
      description = <li key={move}>
        <button className="move" onClick={() => jumpTo(move)}>
          Go to move #{move}</button></li>;
    }
    return (description);
  });

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <div className="game">
        <div className="game-board">
          <Status xIsNext={xIsNext} squares={currentSquares} />
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <h2>History</h2>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}
