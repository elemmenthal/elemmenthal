// TODO define external dependencies
import {I18n} from 'react-i18nify'


const types = {
    CHANGE_LANGUAGE: 'el-i18n/change-language'
};


// TODO put in actions
export function setLanguage(langCode) {
    return {
        type: types.CHANGE_LANGUAGE,
        payload: {
            langCode: langCode
        }
    }
}


export const init = config => {
    I18n.setTranslations(config.translations);
    I18n.setLocale(config.locale);
};


export const middleware = store => next => action => {

    if (action.type !== types.CHANGE_LANGUAGE) {
        return next(action);
    }

    I18n.setLocale(action.payload.langCode);
    // FIXME passthrough
    return next(action);
};

export const config = (reduxStore, config) => {
    init(config);
};

export const reducer = (state = { lang: 'en' }, action = {}) => {

    let substate;

    switch (action.type) {
        case types.CHANGE_LANGUAGE:
            if (state.lang !== action.payload.langCode) {
                return { lang: action.payload.langCode };
            }
            return state;
        default:
            return state
    }
};

export const configStore = (reduxStore) => {
    I18n.setLocale(reduxStore.getState().$elm.i18n.lang);
};