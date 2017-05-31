import React, { PropTypes } from 'react'

const InternalLink = ({ onClick, href }) => {

	return (
		<a href="#"
		   data-internal-href={ href }
		   onClick={e => {
         e.preventDefault();
         e.stopImmediatePropagation();
         e.stopPropagation();
         onClick();
         return false;
       }}
			>
			CLICK ME
		</a>
	)
}

InternalLink.propTypes = {
	onClick: PropTypes.func.isRequired,
	href: PropTypes.string.isRequired
}

export default InternalLink