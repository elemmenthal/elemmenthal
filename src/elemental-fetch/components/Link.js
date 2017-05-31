import React, { PropTypes } from 'react'

const Link = ({ children, onClick }) => {


  return (
    <a href="#"
       onClick={e => {
         e.preventDefault()
         onClick()
       }}
    >
      {children}
    </a>
  )
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
	call: PropTypes.string.isRequired
}

export default Link
