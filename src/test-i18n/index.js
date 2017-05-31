import React, { PropTypes } from 'react'
import { Translate } from 'react-i18nify'

const T = ({ value }) => {
    let newVal = 'test-i18n.' + value;
    return (
            <Translate value={newVal}/>
    )
};

const Link = () => {

    return (
        <a href="#">
            <T value="text"/>
        </a>
    )
}



export default Link

export const translations = {
    en: {
        text: 'This is the text'
    },
    it: {
        text: 'Questo è il testo'
    },
    nl: {
        text: 'Das bla bla'
    }
};
