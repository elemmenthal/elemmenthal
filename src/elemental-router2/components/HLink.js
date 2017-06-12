import React, { PropTypes } from 'react'

const InternalLink = ({ children, onClick, route, href }) => {

	return (
		<a href="#"
		   data-route={ route }
		   data-internal-href={ href }
		   onClick={e => {
         e.preventDefault();
         onClick();
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
	searchParams: PropTypes.object,
	href: PropTypes.string
}

export default InternalLink