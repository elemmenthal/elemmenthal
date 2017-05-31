
import { set } from 'lodash'

export const types = {
	SET_VALUE: 'elemental-bindable/set-value'
};

export function setValue(path, value) {
	return {
		type: types.SET_VALUE,
		path: path,
		value: value
	};
}