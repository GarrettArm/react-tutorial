import React, { useState } from 'react'

import Square from './square.js'
import StatusMessage from './statusMessage.js'

const initialMarkState = 'X'
const initialBoardState = {
  0: null,
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null
}

function isSquareUsed (boardState, i) {
  if (boardState[i] === null) {
    return false
  }
  return true
}

function hasWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function alternateMarks (currentMark) {
  if (currentMark === 'X') {
    return 'O'
  } else {
    return 'X'
  }
}

function Board () {
  const [boardState, setBoardState] = useState(initialBoardState)
  const [markState, setMarkState] = useState(initialMarkState)
  const winner = hasWinner(boardState)

  const handleChange = (i) => {
    if (isSquareUsed(boardState, i)) { return }
    if (winner !== null) { return }
    setBoardState({ ...boardState, [i]: markState })
    setMarkState(alternateMarks(markState))
  }

  const renderSquare = (i) => {
    return <Square id={i} value={boardState[i]} handleChange={handleChange} />
  }

  return (
    <div>
      <div className='status'>
        <StatusMessage winner={winner} markState={markState} />
      </div>
      <div className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

export default Board
