import React, { useState } from 'react'
import PropTypes from 'prop-types'

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

function whichNextMark (history) {
  if (history.length % 2 === 0) {
    return 'O'
  }
  return 'X'
}

Board.propTypes = {
  history: PropTypes.array,
  setHistory: PropTypes.func
}

function Board (props) {
  const { history, setHistory } = props

  const [boardState, setBoardState] = useState(initialBoardState)
  const [markState, setMarkState] = useState(initialMarkState)

  const winner = hasWinner(boardState)

  const handleMark = (i) => {
    if (isSquareUsed(boardState, i)) { return }
    if (winner !== null) { return }
    setBoardState({ ...boardState, [i]: markState })
    setMarkState(whichNextMark(history))
    setHistory([...history, boardState])
  }

  const revertHistory = () => {
    setBoardState(history.at(-1))
    setHistory(history.slice(0, -1))
    setMarkState(whichNextMark(history))
  }

  const renderSquare = (i) => {
    return <Square id={i} value={boardState[i]} handleChange={handleMark} />
  }

  return (
    <div>
      <div className='status'>
        <StatusMessage winner={winner} markState={markState} />
        <button onClick={() => revertHistory()}>Go Back</button>
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
