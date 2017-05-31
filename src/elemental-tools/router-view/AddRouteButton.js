import { connect } from 'react-redux'

import { addRoute } from './actions.js'
import Button from '../components/Button'

const mapStateToProps = (state, ownProps) => {
	// FIXME pippo?
	return {
	routeName: state.todosPage.routeForm.name,
	routePath: state.todosPage.routeForm.path,
	children: 'PIPPO'
}}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onClick: () => {
		dispatch(addRoute(ownProps.routeName, ownProps.routePath))
	}
})

const AddRouteButton = connect(
	mapStateToProps,
	mapDispatchToProps
)(Button)

export default AddRouteButton
