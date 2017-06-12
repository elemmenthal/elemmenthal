import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import KitchenSink from '../kitchen-sink/KitchenSink.js'
import TranslationEditor from '../translation-editor'

export const MainViewComponent = ({ $router }) => {

    if ($router.route === 'dev') {
        return <TranslationEditor />
    }
    if ($router.route === 'kitchenSink') {
        return <KitchenSink />
    }

    return null;
};

MainViewComponent.propTypes = {
    $router: PropTypes.object.isRequired,
};


const mapStateToProps = (state, ownProps) => {
    return {
        $router: state.$elm.router
    }
};



let MainView = connect(mapStateToProps, null)(MainViewComponent);

export default MainView


