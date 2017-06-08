import { combineReducers } from 'redux'
import { forEach, set } from 'lodash'
import { types } from './actions.js'


const translationsReducer = (state = {}, action = {}) => {

    let substate;

    // FIXME check if the language code is valid
    switch (action.type) {
        case types.ADD_LANGUAGE:
            substate = {};
            substate[action.langCode] = '';
            return Object.assign({}, state, substate);

        case types.SET_TRANSLATION:
            substate = {};
            substate[action.langCode] = action.translation;
            return Object.assign({}, state, substate);
        default:
            return state
    }
};

const selectedLangReducer = (state = '', action = {}) => {

    let substate;

    // FIXME check if the language code is valid
    switch (action.type) {
        case types.SELECT_LANGUAGE:
            substate = {
                selectedLang: action.langCode
            };
            return new String(action.langCode);
        default:
            return state
    }
}

export const reducer = combineReducers({
    selectedLang: selectedLangReducer,
    translations: translationsReducer
})