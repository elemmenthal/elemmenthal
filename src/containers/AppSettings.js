import React from 'react'
import { connect } from 'react-redux'

import FetchSettings from '../components/FetchSettings.js'
import RouterSettings from '../components/RouterSettings.js'
import I18nSettings from '../components/I18nSettings.js'

let AppSettings = ({ $router }) => {

	let params = $router.searchParams;
	if (!params || !params._settings) {
		return null;
	}
	switch (params._settings) {
		case 'fetch':
			return <FetchSettings/>;
		case 'router':
			return <RouterSettings/>;
		case 'i18n':
			return <I18nSettings/>;
		default:
			return <b>INVALID $settings PARAMETER</b>;
	}

}

const mapStateToProps = (state, ownProps) => ({
	$router: state.$elm.router
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

AppSettings = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppSettings)

export default AppSettings
