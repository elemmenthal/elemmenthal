import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const IfComponent = ({ children, state, condition, bl }) => {


	if (bl) {
		return (
			<span>{ children }</span>
		)
	} else {
		return null;
	}


};


const mapStateToProps = (state, ownProps) => {
	return {
		state: state
	}
};


let If = connect(mapStateToProps, null)(IfComponent);

export default If