import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const TestRouterComponent = ({ $router }) => {

	if ($router.route === 'allUsers') {
		return <h2>ALL USERS!</h2>
	}
	if ($router.route === 'userResource') {
		return <h2>USER RESOURCE!</h2>
	}
	if ($router.route === 'userDetail') {
		return <h2>USER DETAIL!</h2>
	}

	if ($router.route === 'homePage' && $router.searchParams.filter) {
		return <h2>HOME PAGE WITH FILTER!</h2>
	}
	if ($router.route === 'homePage') {
		return <h2>HOME PAGE!</h2>
	}


  return null;
};

TestRouterComponent.propTypes = {
	$router: PropTypes.object.isRequired,
};


const mapStateToProps = (state, ownProps) => {
	return {
		$router: state.$elm.router
	}
};



let TestRouter = connect(mapStateToProps, null)(TestRouterComponent);

export default TestRouter
