import React from 'react'
import { connect } from 'react-redux'
import { forEach } from 'lodash'

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/yaml';
import 'brace/theme/terminal';

import { Translate } from 'react-i18nify'

import T from './T.js'

import { addLanguage, selectLanguage, setTranslation } from './actions.js'


class TranslationEditorComponent extends React.Component {

    constructor(props) {
        super(props);
        this.onAddLanguageClick = this.onAddLanguageClick.bind(this);
        this.onLanguageItemClick = this.onLanguageItemClick.bind(this);
        this.onChangeEntries = this.onChangeEntries.bind(this);
    }


    render() {

        let langList = [];


        forEach(this.props.translations, (v, k) => {
            langList.push(this.renderLanguageItem(k));
        });

        let content;
        if (langList.length === 0) {
            content = <T value="noLanguages"/>
        } else {
            content = (
                <div>
                    { langList }
                </div>
            );
        }

        let translationText = this.isLanguageSelected() ? this.props.translations[this.props.selectedLang] : '';
        let entries = <AceEditor
            mode="yaml"
            theme="terminal"
            onChange={ this.onChangeEntries }
            name="translation-editor_entries-editor"
            value={translationText}
            readOnly={ !this.isLanguageSelected() }
            //editorProps={{$blockScrolling: true}}
            />;


        return <div data-el-id="translation-editor">
            { this.renderAddLanguageBtn() } <br/>
            SELECTED: { this.props.selectedLang } <br/>
            { content } <br/>
            { entries }
        </div>
    }


    renderLanguageItem(langCode) {
        return <button key={langCode} data-lang={langCode} onClick={ this.onLanguageItemClick }>{ langCode }</button>
    }

    renderAddLanguageBtn() {
        return <button onClick={ (ev) => { this.onAddLanguageClick(ev) } }><T value="addLanguage"/></button>
    }

    onAddLanguageClick() {
        this.props.dispatch(addLanguage(prompt('INSERT LANGUAGE CODE')));
    }

    onLanguageItemClick(ev) {
        let langCode = ev.target.getAttribute('data-lang');
        this.props.dispatch(selectLanguage(langCode));
    }

    onChangeEntries(text) {
        if (this.isLanguageSelected()) {
            this.props.dispatch(setTranslation(this.props.selectedLang, text));
        }
    }

    isLanguageSelected() {
        return this.props.selectedLang && this.props.translations.hasOwnProperty(this.props.selectedLang);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        translations: state.translationEditor.translations,
        selectedLang: state.translationEditor.selectedLang
    }
};


let TranslationEditor = connect(mapStateToProps, null)(TranslationEditorComponent);

export default TranslationEditor


export { reducer } from './reducer.js'
export { translations } from './translations.js'