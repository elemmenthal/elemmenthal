import { forEach } from 'lodash'

import createBrowserHistory from 'history/createBrowserHistory'
import createHashHistory from 'history/createHashHistory'
import pathToRegexp, { compile } from './path-to-regexp'
import { types as actionTypes, notifyRouteChange } from './actions'
import { deparam, coerceTypes } from './utils.js'

import * as historyAction from '../elemental-history/actions'



export const reducer = (state = {}, action = null) => {
	switch (action.type) {
		case actionTypes.NOTIFY_CHANGE:
			return Object.assign({}, state, {
				location: action.location,
				route: action.route.name,
				params: action.params,
				searchParams: action.searchParams
			});

		default:
			return state;
	}
};



let routes = null;
let notFoundRoute = null;




function setRoutes(rts) {
	var i, cnt = rts.length, route, keys;
	for (i=0; i<cnt; ++i) {
		keys = [];
		route = rts[i];
		route.re = pathToRegexp(route.path, keys);
		route.keys = keys;
		route.getPath = compile(route.path);
	}
	routes = rts;
}

function matchRoute(routes, url) {
	for (var i=0; i<routes.length; ++i) {
		var route = routes[i],
			match = route.re.exec(url);
		if (match) {
			var params = {};
			for (var j=0; j<route.keys.length; ++j) {
				params[route.keys[j].name] = match[j + 1];
			}
			return { route: route, params: params };
		}
	}
	return null;
}


// Standard elemental configuration methods
export const init = function (config) {
	setRoutes(config.routes);
	notFoundRoute = config.notFoundRoute;
};

export const middleware = store => next => action => {
	if (action.type == actionTypes.NAVIGATE) {

		// select the route coming from the link
		let route = null;
		for (let i=0; i<routes.length; ++i) {
			if (routes[i].name === action.route) {
				route = routes[i];
				break;
			}
		}
		if (!route) {
			throw new Error('Route "' + action.route + '" is not defined!');
		}

		var url = route.getPath(action.params);

		if (action.searchParams) {
			var searchString = '?';
			forEach(action.searchParams, (v, k) => {
				searchString += encodeURIComponent(k) + '=' + encodeURIComponent(v)
			});
			url += searchString
		}

		store.dispatch(historyAction.navigate(url, 'PUSH')); // FIXME PUSH from LINK PROP

	} else if (action.type == historyAction.types.ELM_HISTORY_SET_LOCATION) {


		let route = null,
			params = null,
			searchParams = null,
			match = matchRoute(routes, action.location.pathname);

		if (match) {
			route = match.route;
			params = match.params;
			searchParams = deparam((action.location.search || '?').substring(1));
		} else {
			route = notFoundRoute.name;
		}

		// set history
		store.dispatch(notifyRouteChange(action.location, route, params, searchParams));


	} else {
		return next(action);
	}



};


export const config = (reduxStore, config) => {
	init(config);
};
