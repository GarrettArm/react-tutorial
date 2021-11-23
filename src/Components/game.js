import React, { useState } from 'react'

import Board from './board.js'

const initialHistory = []

function Game () {
  const [history, setHistory] = useState(initialHistory)
  return (
    <Board history={history} setHistory={setHistory} />
  )
}

export default Game
