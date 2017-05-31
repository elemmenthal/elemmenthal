import createBrowserHistory from 'history/createBrowserHistory'
import createHashHistory from 'history/createHashHistory'

import { types, setLocation } from './actions.js'


let history = null;
let store = null;

let middlewarePassThrough = false;


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


export const init = function (config) {
	setMode(config.mode);
};


export const middleware = store => next => action => {
	if (action.type !== types.ELM_HISTORY_NAVIGATE) {
		return next(action);
	}

	let historyAction = action.method.toLowerCase();
	if (isValidAction(historyAction)) {
		history[historyAction](action.location, action.state);
	} else {
		throw new Error('History method "' + action.method + '" is not supported. Use one of PUSH, POP or REPLACE');
	}


	if (middlewarePassThrough) {
		return next(action);
	}
};

let isTimeTraveling = false;

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
	configStore(reduxStore);
};