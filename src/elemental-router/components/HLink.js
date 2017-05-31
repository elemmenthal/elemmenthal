import React, { PropTypes } from 'react'

const InternalLink = ({ children, onClick, route }) => {

	return (
		<a href="#"
		   data-route={ route }
		   onClick={e => {
         e.preventDefault()
         onClick()
       }}
			>
			{ children }
		</a>
	)
}

InternalLink.propTypes = {
	onClick: PropTypes.func.isRequired,
	route: PropTypes.string,
	params: PropTypes.object,
	searchParams: PropTypes.object
}

export default InternalLink