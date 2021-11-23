import React, { useState } from 'react'

import Square from './square.js'

const initialSquareState = {
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

function Board () {
  const [squareState, setSquareState] = useState(initialSquareState)
  const handleChange = (i, value) => {
    setSquareState({ ...squareState, [i]: value })
  }
  const renderSquare = (i) => {
    return <Square id={i} value={squareState[i]} handleChange={handleChange} />
  }
  return (
    <div>
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
