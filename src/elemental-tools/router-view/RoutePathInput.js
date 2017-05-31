import { connect } from 'react-redux'

import { routeSetPath } from './actions.js'
import TextInput from '../components/TextInput'


const mapDispatchToProps = (dispatch, ownProps) => ({
	onChange: (e) => {
		dispatch(routeSetPath(e.target.value))
	}
});

const RoutePathInput = connect(
	null,
	mapDispatchToProps
)(TextInput)

export default RoutePathInput
