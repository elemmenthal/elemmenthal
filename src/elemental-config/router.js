export default {
	mode: 'browser',
	routes: [
		{ name: 'homePage', path: '/'},
		{ name: 'allUsers', path: '/users/all' },
		{ name: 'userDetail', path: '/users/:id(\\d+)'},
		{ name: 'userResource', path: '/users/:id/resources/:resId'}
	],
	notFoundRoute: { name: 'notFound', path: '/route-not-found'}
};
