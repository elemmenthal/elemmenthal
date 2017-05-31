import React, { PropTypes } from 'react'

const Button = ({ children, onClick, disabled }) => {

	let conditionalProps = {};

	if (disabled) {
		conditionalProps.disabled = 'disabled'
	}

	return (
		<button type="button"
			{...conditionalProps}
		   onClick={e => {
         e.preventDefault()
         onClick()
       }}
			>
			{children}
		</button>
	)
}

Button.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool
}

export default Button
