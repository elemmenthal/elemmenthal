import React from 'react'
import { connect } from 'react-redux'
import { get, debounce } from 'lodash'
import { setValue } from '../actions.js'



class ColorPickerComponent extends React.Component {


	constructor(props) {
		super(props);
		this.state = { value: this.props.defaultValue || '#000000' };

		this.dDispatch = debounce( (action) => {
			this.props.dispatch(action);
			this.setState({value: action.value});
		}, this.props.debounce || 0 );
	}


	handleChange(event) {
		event.preventDefault();
		this.setState( { value: event.target.value });
		this.dDispatch(setValue(this.props.bind, event.target.value));
	}

	render() {
		return (
			<input
				type="color"
				onChange={this.handleChange.bind(this)}
				onInput={this.handleChange.bind(this)}
				value={this.state.value}
				/>
		);
	}

	componentWillReceiveProps({ value }) {
		this.setState( { value: value });
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		value: get(state, ownProps.bind, '')
	}
};


let ColorPicker = connect(mapStateToProps, null)(ColorPickerComponent);

export default ColorPicker
