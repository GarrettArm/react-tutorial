import React from 'react'
import PropTypes from 'prop-types'

StatusMessage.propTypes = {
  winner: PropTypes.string,
  markState: PropTypes.string
}

function StatusMessage (props) {
  const { winner, markState } = props
  if (winner) {
    return <div>Winner: {winner}</div>
  }
  return <div>Next player: {markState}</div>
}

export default StatusMessage
