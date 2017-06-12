import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import { reducer as bindableReducer, reducerName as bindableReducerName } from './elemental-bindable'


// elemental dev tools
import edtReducer from './elemental-dev-tools/reducer.js'


// elemental imports

import * as elmI18n from './elemental-i18n'
//import * as elmHistory from './elemental-history'

import * as elmRouter2 from './elemental-router2'
import * as elmBindable from './elemental-bindable'
import * as elmFetch from './elemental-fetch'

const elementalModules = [elmI18n, /*elmHistory,*/ elmRouter2, elmBindable, elmFetch];


// app imports
import * as translationEditor from './translation-editor'


import i18nConfig from './elemental-config/i18n.js';

const appModules = ['test-i18n', 'translation-editor'];

const elTranslations = [];
for (let i=0; i<appModules.length; ++i) {
	let curModule = require('./' + appModules[i] + '/index.js');
	console.log(curModule);
	if (curModule.translations) {
		for (let k in curModule.translations) {
			if (curModule.translations.hasOwnProperty(k)) {
				i18nConfig.translations[k] = i18nConfig.translations[k] || {};
				i18nConfig.translations[k][appModules[i]] = curModule.translations[k];
			}
		}
	}
}

// FIXME REMOVE
console.log(i18nConfig);


import routerConfig from './elemental-config/router.js';
import elmFetchConfig from './elemental-config/fetch.js';
/*
const historyConfig = {
	mode: routerConfig.mode
};
*/



const elementalConfigs = [i18nConfig, /*historyConfig,*/ routerConfig, null, elmFetchConfig];

// PRE CONFIG

const elementalMiddlewares = [];
for (let i=0; i<elementalModules.length; ++i) {
	let curModule = elementalModules[i];
	if (typeof curModule.init === 'function') {
		curModule.init(elementalConfigs[i]);
	}
	if (typeof curModule.middleware === 'function') {
		elementalMiddlewares.push(curModule.middleware);
	}
}

/* // for combineReducers
const reducers = {
	router: elmRouter2.reducer
};
reducers[bindableReducerName] = bindableReducer;
*/

function root(state = {}, action = {}) {

	state.$elm = state.$elm || {};
	let newState = {
		$edt: edtReducer(state.$edt, action),
		translationEditor: translationEditor.reducer(state.translationEditor, action),
		$elm: {
			router: elmRouter2.reducer(state.$elm.router, action),
			i18n: elmI18n.reducer(state.$elm.i18n, action)
		}
	};
	return Object.assign({}, newState, bindableReducer(state, action));
}

import persistState from 'redux-localstorage'

var persistedState = {};
try { persistedState = JSON.parse(window.localStorage.redux) } catch(e) {}

const store = createStore(
	root,//combineReducers(reducers),
	persistedState,
	compose(
		persistState(),
		applyMiddleware.apply(this, elementalMiddlewares),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	));



// POST CONFIG
for (let i=0; i<elementalModules.length; ++i) {
	let curModule = elementalModules[i];
	if (typeof curModule.configStore === 'function') {
		curModule.configStore(store);
	}
}


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
