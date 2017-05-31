import React from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'

export const SpanComponent = ({ value }) => {
  return (
    <span>{value}</span>
  )
};

const mapStateToProps = (state, ownProps) => {
	return {
		value: get(state, ownProps.bind, '')
	}
};


let Span = connect(mapStateToProps, null)(SpanComponent);

export default Span
