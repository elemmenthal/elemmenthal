export const types = {
	NOTIFY_CHANGE: 'elemental-router/notify-change',
	NAVIGATE: 'elemental-router/navigate',
	SET_LOCATION: 'elemental-router/set-location',
	NAVIGATE_HREF: 'elemental-router/navigate-href',
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

export function setLocation(location, method) {
	return {
		type: types.SET_LOCATION,
		payload: {
			location: location,
			method: method
		}
	}
}

export function navigateHref(href, method) {
	return {
		type: types.NAVIGATE_HREF,
		payload: {
			location: href,
			method: method
		}
	}
}