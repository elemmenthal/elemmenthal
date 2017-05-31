import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { setValue } from '../actions.js'

export const TextInputComponent = ({ onChange, bind, value }) => {
  let input;

  return (
    <input
	    ref={node => { input = node } }
			onChange={onChange}
			value={value}
		/>
  )
};

TextInputComponent.propTypes = {
	bind: PropTypes.string.isRequired,
};


const mapStateToProps = (state, ownProps) => {
	return {
		value: get(state, ownProps.bind, '')
	}
};

const mapDispatchToProps = (dispatch, ownProps) => ({
	onChange: (event) => {
		event.preventDefault();
		dispatch(setValue(ownProps.bind, event.target.value));
	}
});

let TextInput = connect(mapStateToProps, mapDispatchToProps)(TextInputComponent);

export default TextInput
