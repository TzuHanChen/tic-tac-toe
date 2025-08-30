"use client";

import { useState } from "react";
import { CircleSmall, X } from "./icons";

type Square = 'O' | 'X' | null;
type Board = Array<Square>;
type History = Array<Board>;

function calculateWinner(squares: Board) {
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
  return currentMove === 9
}

function Square({ value, onSquareClick }: {
  value: Square,
  onSquareClick: () => void,
}) {
  return (
    <button data-value={value} onClick={onSquareClick}
      className="size-12 border border-gray-200 bg-white flex justify-center items-center data-[value=O]:text-teal-700 data-[value=X]:text-rose-800 hover:cursor-pointer active:cursor-pointer">
      {value === 'X' && <X />}
      {value === 'O' && <CircleSmall />}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }: {
  xIsNext: boolean,
  squares: Board,
  onPlay: (nextSquares: Board) => void,
}) {
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

  let threeSquare = [];
  const threeRow = [];
  for (let i = 0; i < 3; i++) {
    threeSquare = [];
    for (let j = 0; j < 3; j++) {
      threeSquare.push(
        <Square key={j} value={squares[i * 3 + j]}
          onSquareClick={() => handleClick(i * 3 + j)} />
      );
    }
    threeRow.push(
      <div className="flex" key={i}>{threeSquare}</div>
    );
  }
  return <div className="size-min mx-auto">{threeRow}</div>;
}

function Status({ xIsNext, squares, currentMove }: {
  xIsNext: boolean,
  squares: Board,
  currentMove: number,
}) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = <span className="flex justify-center items-center">
      獲勝者　{winner === 'X' ? <X /> : <CircleSmall />}</span>;
  } else if (calculateDraw(currentMove)) {
    status = '平手';
  } else {
    status = <span className="flex justify-center items-center">
      下一位　{xIsNext ? <X /> : <CircleSmall />}</span>;
  }

  return <h2 className="mt-3 text-2xl font-bold text-center">{status}</h2>;
}

function History({ history, currentMove, setCurrentMove }: {
  history: History,
  currentMove: number,
  setCurrentMove: React.Dispatch<React.SetStateAction<number>>,
}) {
  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    if (move === currentMove) {
      return (
        <p key={move} className="leading-9 font-bold text-center">
          {(move === 0) ? '遊戲的起點' : `第 ${move} 回合`}
        </p>
      )
    } else {
      return (
        <button key={move} onClick={() => jumpTo(move)}
          className="rounded-2xl border-none py-1.5 px-3 bg-gray-200 hover:cursor-pointer hover:bg-gray-600 hover:text-white active:cursor-pointer active:bg-gray-600 active:text-white transition-colors duration-300">
          {(move === 0) ? '遊戲的起點' : `第 ${move} 回合`}
        </button>
      )
    }
  });

  return <div className="mt-6 w-full grid grid-flow-col grid-cols-2 grid-rows-5 gap-2">{moves}</div>
}

export default function Home() {
  const [history, setHistory] = useState<History>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: Board) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <div className="shadow-md rounded-2xl min-w-80 bg-gray-100 p-6 text-gray-800">
      <h1 className="mb-6 text-4xl font-bold text-center">井字遊戲</h1>
      <Board xIsNext={xIsNext}
        squares={currentSquares}
        onPlay={handlePlay} />
      <Status xIsNext={xIsNext}
        squares={currentSquares}
        currentMove={currentMove} />
      <History history={history} currentMove={currentMove} setCurrentMove={setCurrentMove} />
    </div>
  );
}
