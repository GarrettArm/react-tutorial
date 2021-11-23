import React from 'react'
import PropTypes from 'prop-types'

Square.propTypes = {
  id: PropTypes.number,
  value: PropTypes.string,
  handleChange: PropTypes.func
}

function Square (props) {
  const { id, value, handleChange } = props
  return (
    <button className='square' key={id.toString()} onClick={() => handleChange(id)}>
      {value}
    </button>
  )
}

export default Square
