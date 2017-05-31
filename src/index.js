import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import { reducer as bindableReducer, reducerName as bindableReducerName } from './elemental-bindable'


// elemental dev tools
import edtReducer from './elemental-dev-tools/reducer.js'


// elemental imports

import * as elmI18n from './elemental-i18n'
import * as elmHistory from './elemental-history'

import * as elmRouter2 from './elemental-router'
import * as elmBindable from './elemental-bindable'
import * as elmFetch from './elemental-fetch'

const elementalModules = [elmI18n, elmHistory, elmRouter2, elmBindable, elmFetch];



const i18nConfig = {
	locale: 'en',
	translations: {
		en: {
			application: {
				title: 'Awesome app with i18n!',
				hello: 'Hello, %{name}!'
			}
		},
		nl: {
			application: {
				title: 'Toffe app met i18n!',
				hello: 'Hallo, %{name}!'
			}
		}
	}
};

const appModules = ['test-i18n'];

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
console.log(i18nConfig);


import routerConfig from './elemental-config/router.js';
import elmFetchConfig from './elemental-config/fetch.js';

const historyConfig = {
	mode: routerConfig.mode
};



const elementalConfigs = [i18nConfig, historyConfig, routerConfig, null, elmFetchConfig];

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
	todosPage: reducer,
	router: elmRouter2.reducer
};
reducers[bindableReducerName] = bindableReducer;
*/

function root(state = {}, action = {}) {
	let newState = {
		todosPage: reducer(state.todosPage, action),
		$router: elmRouter2.reducer(state.$router, action),
		$edt: edtReducer(state.$edt, action)
	};
	return Object.assign({}, newState, bindableReducer(state, action));
}

const store = createStore(
	root,//combineReducers(reducers),
	{},
	compose(
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