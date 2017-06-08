
export const types = {
	ELM_HISTORY_NAVIGATE: 'elemental-history/navigate',
	ELM_HISTORY_SET_LOCATION: 'elemental-history/set-location'
};


export function navigate(href, method) {
	return {
		type: types.ELM_HISTORY_NAVIGATE,
		payload: {
			location: href,
			method: method
		}
	}
}

export function setLocation(location, method) {
	return {
		type: types.ELM_HISTORY_SET_LOCATION,
		payload: {
			location: location,
			method: method
		}
	}
}