export const types = {
	NOTIFY_CHANGE: 'elemental-router/notify-change',
	NAVIGATE: 'elemental-router/navigate'
};

export function notifyRouteChange(location, route, params, searchParams) {
	return {
		type: types.NOTIFY_CHANGE,
		payload: {
			location: location,
			route: route,
			params: params || {},
			searchParams: searchParams || {}
		}
	}
}

export function navigateToRoute(route, params, searchParams) {
	return {
		type: types.NAVIGATE,
		payload: {
			route: route,
			params: params || {},
			searchParams: searchParams || {}
		}
	}
}