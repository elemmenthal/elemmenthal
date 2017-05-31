
export const types = {
	ROUTE_ADD: 'elemental-tools/route-add',

	ROUTE_SET_NAME: 'elemental-tools/route-set-name',
	ROUTE_SET_PATH: 'elemental-tools/route-set-path'
};

export function addRoute(name, path) {
	return {
		type: types.ROUTE_ADD,
		name: name,
		path: path
	}
}

export function routeSetName(name) {
	return {
		type: types.ROUTE_SET_NAME,
		name: name
	}
}

export function routeSetPath(path) {
	return {
		type: types.ROUTE_SET_PATH,
		path: path
	}
}