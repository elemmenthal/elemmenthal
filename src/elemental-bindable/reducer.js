
import { set } from 'lodash'

import { types as bindableAction } from './actions.js'

const bindable = (state = {}, action = {}) => {
  switch (action.type) {
    case bindableAction.SET_VALUE:
	    var updateObj = {};
	    set(updateObj, action.payload.path, action.payload.value || '');
      return updateObj;
    default:
      return {}
  }
};

export default bindable
