export const types = {
    ADD_LANGUAGE: 'translation-editor/add-language',
    SELECT_LANGUAGE: 'translation-editor/select-language',
    SET_TRANSLATION: 'translation-editor/set-translation'
};

export function addLanguage(langCode) {
    return {
        type: types.ADD_LANGUAGE,
        langCode: langCode
    }
}

export function selectLanguage(langCode) {
    return {
        type: types.SELECT_LANGUAGE,
        langCode: langCode
    }
}

export function setTranslation(langCode, translation) {
    return {
        type: types.SET_TRANSLATION,
        langCode: langCode,
        translation: translation
    }
}