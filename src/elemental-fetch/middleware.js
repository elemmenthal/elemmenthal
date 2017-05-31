
import { get, set, forEach } from 'lodash'
import { types, apiResponse } from './actions.js';

let mixins;
let compiledCalls;

export function setConfig(config) {
	mixins = config.mixins;
	compiledCalls = Object.assign({}, config.calls);
	forEach(config.calls, (call, callKey) => {
		compiledCalls[callKey].request = mergeMixins(call.request, call.mixins);
		let requestObj = compiledCalls[callKey].request;
		if (requestObj.baseUrl) {
			requestObj.url = requestObj.baseUrl + requestObj.url
		}
		requestObj.method = requestObj.method || 'GET';
	});
}

function mergeMixins(request, mixinNames) {
	var reqData = {};
	if (mixinNames) {
		for (var i = 0; i < mixinNames.length; ++i) {
			Object.assign(reqData, mixins[mixinNames[i]]);
		}
	}
	Object.assign(reqData, request);
	return reqData;
}

function getStateValues(state, dataFromState) {
	let stateValue,
		resData = {};
	if (dataFromState) {
		forEach(dataFromState, function(v, k) {
			stateValue = get(state, v);
			if (stateValue === undefined) {
				console.warn('elemental-fetch: "' + v + '" in state is undefined!');
			}
			if (get(resData, k) !== undefined) {
				console.warn('elemental-fetch: "' + k + '" is already defined in static "data" property!', resData);
			}
			set(resData, k, stateValue);
		});
	}
	return resData;
}

function getFinalUrl(requestUrl, urlParams) {
	var reSearchQuery = /\?[^#]+/i;
	var match = requestUrl.match(reSearchQuery);
	var preQuery = requestUrl,
		postQuery = '',
		queryArray = [];
	if (match && match.length) {
		queryArray = match[0].substring(1).split('&');
		preQuery = requestUrl.substring(0, match.index);
		postQuery = requestUrl.substring(match.index + match[0].length);
	}
	if (urlParams) {
		for (var k in urlParams) {
			if (urlParams.hasOwnProperty(k)) {
				queryArray.push(encodeURIComponent(k) + '=' + encodeURIComponent(urlParams[k]));
			}
		}
	}
	var queryString = queryArray.length ? '?' + queryArray.join('&') : '';
	return preQuery + queryString + postQuery;
}

const fetchMiddleware = store => next => action => {

	if (action.type === types.API_CALL) {

		let callObj = compiledCalls[action.key];
		if (!callObj) {
			throw new Error('elemental-fetch: call "' + action.key + '" is not defined!');
		}

		let reqData = callObj.request;

		if (reqData.data || reqData.dataFromState) {
			reqData.data = reqData.data || {};
			let dataFromState = reqData.dataFromState || {};
			let state = store.getState();
			let stateValue;
			forEach(dataFromState, function(v, k) {
				stateValue = get(state, v);
				if (stateValue === undefined) {
					console.warn('elemental-fetch: "' + v + '" in state is undefined!');
				}
				if (get(reqData.data, k) !== undefined) {
					console.warn('elemental-fetch: "' + k + '" is already defined in static "data" property!', reqData);
				}
				set(reqData.data, k, stateValue);
			});
		}

		var reSearchQuery = /\?[^#]+/i;
		var match = reqData.url.match(reSearchQuery);
		var preQuery = reqData.url,
			postQuery = '',
			queryArray = [];
		if (match && match.length) {
			queryArray = match[0].substring(1).split('&');
			preQuery = reqData.url.substring(0, match.index);
			postQuery = reqData.url.substring(match.index + match[0].length);
		}
		if (reqData.urlParams) {
			for (var k in reqData.urlParams) {
				if (reqData.urlParams.hasOwnProperty(k)) {
					queryArray.push(encodeURIComponent(k) + '=' + encodeURIComponent(reqData.urlParams[k]));
				}
			}
		}
		var queryString = queryArray.length ? '?' + queryArray.join('&') : '',
			finalUrl = preQuery + queryString + postQuery;

		var body = reqData.data;
		if (reqData.responseType === 'json') {
			body = JSON.stringify(reqData.data);
		}

		var myInit = {
			method: reqData.method,
			headers: reqData.headers || [],
			mode: reqData.mode,
			body: body
		};

		var finalResp = {};
		fetch(finalUrl, myInit)
			.then(function (resp) {
				var itr = resp.headers.entries(),
					headers = {};
				for (var en = itr.next(); en.done === false; en = itr.next()) {
					headers[en.value[0]] = en.value[1];
				}
				finalResp = {
					status: resp.status,
					statusText: resp.statusText,
					ok: resp.ok,
					redirected: resp.redirected,
					type: resp.type,
					url: resp.url,
					useFinalUrl: resp.useFinalUrl,
					headers: headers
				};
				return resp[reqData.responseType || 'text']();
			})
			.then(function (data) {
				finalResp.data = data;
				store.dispatch(apiResponse(finalResp, { requestAction: action }));
				return data;
			});

	} else if (action.type === types.API_REQUEST) {

		let reqData = {};
		if (action.mixins) {
			for (var i = 0; i < action.mixins.length; ++i) {
				Object.assign(reqData, mixins[action.mixins[i]]);
			}
		}
		Object.assign(reqData, action.request);


		if (reqData.baseUrl) {
			reqData.url = reqData.baseUrl + reqData.url
		}

		reqData.method = reqData.method || 'GET';


		if (reqData.data || reqData.dataFromState) {
			reqData.data = reqData.data || {};
			let dataFromState = reqData.dataFromState || {};
			let state = store.getState();
			let stateValue;
			forEach(dataFromState, function(v, k) {
				stateValue = get(state, v);
				if (stateValue === undefined) {
					console.warn('elemental-fetch: "' + v + '" in state is undefined!');
				}
				if (get(reqData.data, k) !== undefined) {
					console.warn('elemental-fetch: "' + k + '" is already defined in static "data" property!', reqData);
				}
				set(reqData.data, k, stateValue);
			});
		}

		var reSearchQuery = /\?[^#]+/i;
		var match = reqData.url.match(reSearchQuery);
		var preQuery = reqData.url,
			postQuery = '',
			queryArray = [];
		if (match && match.length) {
			queryArray = match[0].substring(1).split('&');
			preQuery = reqData.url.substring(0, match.index);
			postQuery = reqData.url.substring(match.index + match[0].length);
		}
		if (reqData.urlParams) {
			for (var k in reqData.urlParams) {
				if (reqData.urlParams.hasOwnProperty(k)) {
					queryArray.push(encodeURIComponent(k) + '=' + encodeURIComponent(reqData.urlParams[k]));
				}
			}
		}
		var queryString = queryArray.length ? '?' + queryArray.join('&') : '',
			finalUrl = preQuery + queryString + postQuery;

		var body = reqData.data;
		if (reqData.responseType === 'json') {
			body = JSON.stringify(reqData.data);
		}

		var myInit = {
			method: reqData.method,
			headers: reqData.headers || [],
			mode: reqData.mode,
			body: body
		};

		var finalResp = {};
		fetch(finalUrl, myInit)
			.then(function (resp) {
				var itr = resp.headers.entries(),
					headers = {};
				for (var en = itr.next(); en.done === false; en = itr.next()) {
					headers[en.value[0]] = en.value[1];
				}
				finalResp = {
					status: resp.status,
					statusText: resp.statusText,
					ok: resp.ok,
					redirected: resp.redirected,
					type: resp.type,
					url: resp.url,
					useFinalUrl: resp.useFinalUrl,
					headers: headers
				};
				return resp[reqData.responseType || 'text']();
			})
			.then(function (data) {
				finalResp.data = data;
				store.dispatch(apiResponse(finalResp, { requestAction: action }));
				return data;
			});

	}
	return next(action);
};

export default fetchMiddleware;
