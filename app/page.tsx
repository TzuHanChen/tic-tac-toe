"use client";

import { useState } from "react";

function calculateWinner(squares: any) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function calculateDraw(currentMove: number) {
  if (currentMove === 9) {
    return true;
  }
  return false;
}

function Square({ value, onSquareClick }:
  { value: any, onSquareClick: any }) {
  return (
    <button className="-mr-1 -mt-1 size-9 p-0 border border-gray-200 bg-white text-teal-700 text-2xl font-bold leading-9 text-center hover:cursor-pointer active:cursor-pointer" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }:
  { xIsNext: any, squares: any, onPlay: any }) {
  function handleClick(i: number) {
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
      threeSquare.push(
        <Square value={squares[i * 3 + j]}
          onSquareClick={() => handleClick(i * 3 + j)}
          key={j} />
      );
    }
    threeRow.push(
      <div className="-mb-1 h-9 flex items-start" key={i}>
        {threeSquare}
      </div>
    );
  }
  return <div className="w-27 mx-auto">{threeRow}</div>;
}

function Status({ xIsNext, squares, currentMove }:
  { xIsNext: boolean, squares: any, currentMove: number }) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = '獲勝者: ' + winner;
  } else if (calculateDraw(currentMove)) {
    status = '平手';
  } else {
    status = '下一位: ' + (xIsNext ? 'X' : 'O');
  }

  return <h2 className="mt-1.5 text-2xl font-bold text-center">{status}</h2>;
}

function History({ history, currentMove, setCurrentMove }:
  { history: any[][], currentMove: number, setCurrentMove: any }) {
  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move === currentMove) {
      description =
        <span className="leading-9 font-bold text-teal-700">
          你在第 {move} 回合
        </span>;
    } else if (move === 0) {
      description =
        <button className="" onClick={() => jumpTo(move)}>
          前往遊戲的起點
        </button>;
    } else {
      description =
        <button className="rounded-2xl border-none h-7.5 py-1.5 px-3 bg-gray-200 hover:cursor-pointer hover:bg-teal-700 hover:text-white active:cursor-pointer active:bg-teal-700 active:text-white transition-colors duration-300" onClick={() => jumpTo(move)}>
          前往第 {move} 回合
        </button>;
    }
    return (
      <li className="h-9 list-none text-center" key={move}>{description}</li>
    );
  });

  return <ol>{moves}</ol>;
}

export default function Home() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];

	function handlePlay(nextSquares: any) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

  return (
    <div className="shadow-md rounded-2xl w-75 min-h-108 bg-gray-100 px-3 text-gray-800">
      <h1 className="my-1.5 text-4xl font-bold text-center">井字遊戲</h1>
      <div className="flex justify-between">
        <div className="w-1/2">
          <Board xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay} />
          <Status xIsNext={xIsNext}
            squares={currentSquares}
            currentMove={currentMove} />
        </div>
        <div className="w-1/2">
          <History history={history} currentMove={currentMove} setCurrentMove={setCurrentMove} />
        </div>
      </div>
    </div>
  );
}
