import { combineReducers } from 'redux'
import todos from './todos'
import routes, { routeForm } from './routes'
import visibilityFilter from './visibilityFilter'


/*


const todoApp = combineReducers({
  todos,
  visibilityFilter,
	routes,
	routeForm
})

export default todoApp
*/

export default function root(state = {}, action = {}) {

	let newState = {
		todos: todos(state.todos, action),
		visibilityFilter: visibilityFilter(state.visibilityFilter, action),
		routes: routes(state.routes, action),
		routeForm: routeForm(state.routeForm, action)
	};


	return newState;
}