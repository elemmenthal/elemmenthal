import React from 'react'
import { Translate } from 'react-i18nify'
export default ({ value }) => {
    let newVal = 'translation-editor.' + value;
    return (
        <Translate value={newVal}/>
    )
};