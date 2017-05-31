import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import FetchSettings from './settings-fetch/components/FetchSettings.js'

export const ElementalToolsComponent = ({ $edt }) => {

//	if ($router.route === 'allUsers') {
		return <FetchSettings/>
	//}


 // return null;
};

ElementalToolsComponent.propTypes = {
	$edt: PropTypes.object.isRequired,
};


const mapStateToProps = (state, ownProps) => {
	return {
		$edt: state.$edt
	}
};



let ElementalTools = connect(mapStateToProps, null)(ElementalToolsComponent);

export default ElementalTools
