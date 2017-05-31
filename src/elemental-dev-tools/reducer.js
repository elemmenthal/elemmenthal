import { get } from 'lodash'
import { types as fetchActions} from '../elemental-fetch/actions'

const edtReducer = (state = {}, action = {}) => {

	switch (action.type) {
		case fetchActions.API_RESPONSE:

			if (get(action, 'meta.requestAction.key') === 'getProjects')
				return Object.assign({}, state, { projects: action.response.data });
			debugger;
			return state
		default:
			return state
	}
};


export default edtReducer
