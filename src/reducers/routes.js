import { types } from '../elemental-tools/router-view/actions.js'

const route = (state = {}, action = {}) => {
  switch (action.type) {
    case types.ROUTE_ADD:
      return {
        name: action.name,
        path: action.path
      };
	  case types.ROUTE_SET_NAME:
		  return {
			  ...state,
			  name: action.name
		  };
	  case types.ROUTE_SET_PATH:
		  return {
			  ...state,
			  path: action.path
		  };
    default:
      return state;
  }
}

const routes = (state = [], action = {}) => {
  switch (action.type) {
    case types.ROUTE_ADD:
      return [
        ...state,
        route(undefined, action)
      ]
    default:
      return state
  }
}

export default routes
export const routeForm = route;

