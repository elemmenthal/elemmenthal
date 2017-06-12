import { forEach } from 'lodash'

import createBrowserHistory from 'history/createBrowserHistory'
import createHashHistory from 'history/createHashHistory'
import pathToRegexp, { compile } from './path-to-regexp'
import { types as actionTypes, notifyRouteChange, setLocation } from './actions'
import { deparam, coerceTypes } from './utils.js'





// history
let history = null;
let store = null;
let middlewarePassThrough = false; // FIXME is it necessary?
let isTimeTraveling = false;

let routes = null;
let notFoundRoute = null;



export const reducer = (state = {}, action = null) => {
	let payload = action.payload;
	switch (action.type) {
		case actionTypes.NOTIFY_CHANGE:
			return Object.assign({}, state, {
				location: payload.location,
				route: payload.route.name,
				params: payload.params,
				searchParams: payload.searchParams
			});

		default:
			return state;
	}
};


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
	setMode(config.mode);
	setRoutes(config.routes);
	notFoundRoute = config.notFoundRoute;
};

export const middleware = store => next => action => {

	let payload = action.payload;

	if (action.type === actionTypes.NAVIGATE) {

		// select the route coming from the link
		let route = null;
		for (let i=0; i<routes.length; ++i) {
			if (routes[i].name === payload.route) {
				route = routes[i];
				break;
			}
		}
		if (!route) {
			throw new Error('Route "' + payload.route + '" is not defined!');
		}

		var url = route.getPath(payload.params);

		if (payload.searchParams) {
			var searchString = '?';
			forEach(payload.searchParams, (v, k) => {
				searchString += encodeURIComponent(k) + '=' + encodeURIComponent(v)
			});
			url += searchString
		}


		let historyAction ='PUSH'.toLowerCase(); // FIXME PUSH from LINK PROP
		if (isValidAction(historyAction)) {
			history[historyAction](url, payload.state); // FIXME define state
		} else {
			// FIXME handle error in FSA way (transform payload in error object?)
			action.error = true;
			throw new Error('History method "' + payload.method + '" is not supported. Use one of PUSH, POP or REPLACE');
		}

	} else if (action.type === actionTypes.NAVIGATE_HREF) {

		let historyAction ='PUSH'.toLowerCase(); // FIXME PUSH from LINK PROP
		if (isValidAction(historyAction)) {
			history[historyAction](payload.location, payload.state); // FIXME define state
		} else {
			// FIXME handle error in FSA way (transform payload in error object?)
			action.error = true;
			throw new Error('History method "' + payload.method + '" is not supported. Use one of PUSH, POP or REPLACE');
		}

	} else if (action.type == actionTypes.SET_LOCATION) {


		let route = null,
			params = null,
			searchParams = null,
			match = matchRoute(routes, payload.location.pathname);

		if (match) {
			route = match.route;
			params = match.params;
			searchParams = deparam((payload.location.search || '?').substring(1));
		} else {
			route = notFoundRoute.name;
		}

		// set history
		store.dispatch(notifyRouteChange(payload.location, route, params, searchParams));


	} else {
		return next(action);
	}



};


export const configStore = (reduxStore) => {
	store = reduxStore;

	const urlChangeHandler = (location, action) => {
		if (!isTimeTraveling) {
			store.dispatch(setLocation(location, action));
		}
	};


	history.listen(urlChangeHandler);
	urlChangeHandler(history.location, 'REPLACE');

	// align url with store changes
	store.subscribe(() => {
		let rtr = store.getState().$router;
		if (rtr && history.location !== rtr.location) {
			isTimeTraveling = true;
			history.replace(rtr.location);
			isTimeTraveling = false;
		}
	});

};


export const config = (reduxStore, config) => {
	init(config);
	setMode(config.mode);
	configStore(reduxStore);
};



// private funcs

function setMode(mode) {
	if (mode === 'hash') {
		history = createHashHistory();
	} else {
		history = createBrowserHistory();
	}
}

function isValidAction(historyAction) {
	return ['push', 'pop', 'replace'].indexOf(historyAction.toLowerCase()) >= 0;
}