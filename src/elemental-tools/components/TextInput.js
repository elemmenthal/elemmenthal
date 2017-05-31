import React, { PropTypes } from 'react'


const TextInput = ({ children, onChange, disabled }) => {

	let conditionalProps = {};

	if (disabled) {
		conditionalProps.disabled = 'disabled'
	}

	if (onChange) {
		conditionalProps.onChange = e => {
			e.preventDefault();
			onChange(e);
		}
	}

	return (
		<input type="text" {...conditionalProps}>
			{children}
		</input>
	)
}

TextInput.propTypes = {
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool
};

export default TextInput
