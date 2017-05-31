import { connect } from 'react-redux'

import { routeSetName } from './actions.js'
import TextInput from '../components/TextInput'


const mapDispatchToProps = (dispatch, ownProps) => ({
	onChange: (e) => {
		dispatch(routeSetName(e.target.value))
	}
});

const RouteNameInput = connect(
	null,
	mapDispatchToProps
)(TextInput)

export default RouteNameInput
