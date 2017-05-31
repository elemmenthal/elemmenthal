
// TODO define external dependencies
import {I18n} from 'react-i18nify'


// TODO put in actions
export function setLanguage(code) {
	return {
		type: 'ele-i18n/change-language',
		code: code
	}
}


export const init = config => {
	I18n.setTranslations(config.translations);
	I18n.setLocale(config.locale);
};


export const middleware = store => next => action => {

	if (action.type !== 'ele-i18n/change-language') {
		return next(action);
	}

	I18n.setLocale(action.code);
	// FIXME passthrough
	return next(action);
};

export const config = (reduxStore, config) => {
	init(config);
};