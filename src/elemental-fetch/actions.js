export const types = {
	API_REQUEST: 'elemental-fetch/api-request',
	API_RESPONSE: 'elemental-fetch/api-response',
	API_CALL: 'elemental-fetch/api-call'
};


export function apiResponse (response, meta) {
	return {
		type: types.API_RESPONSE,
		response: response,
		meta: meta
	};
}

export function apiRequest (request, mixins) {
	return {
		type: types.API_REQUEST,
		request: request,
		mixins: mixins
	};
}

export function apiCall (callKey) {
	return {
		type: types.API_CALL,
		key: callKey
	};
}