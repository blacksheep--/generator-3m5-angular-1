/*
 Tutorial:
 https://ui-router.github.io/tutorial/ng1/helloworld
 Wiki:
 https://github.com/angular-ui/ui-router/wiki
 */

export function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
	// Uncomment this line if you want 'real' URLs instead of hashes '#' (for SEO purposes)
	// $locationProvider.html5Mode(true);

	$stateProvider
	/*
	 The 'home' state is parent for all other states,
	 It could be used to load some global application data before everything else.
	 It is also abstract, so you can't open it directly
	 */
		.state('home', {
			url: '/',
			abstract: true,
			template: '<ui-view></ui-view>',
			/*
			 When a user switches back and forth between pages, the app often needs to fetch data from a server API
			 A state can specify the data it requires by using a resolve: block.
			 When the user tries to activate such state, UI-Router will fetch the required data before activating the state.
			 That means variables these variables will be already available to you inside of component
			 You _should_ use resolve for preloading all data used in component
			 */
			resolve: {
				appConfig: (restService, $rootScope) => {
					/*
					 Using some service to fetch data
					 Do not use $http in router or controllers directly, _always_ use services instead
					 */
					return restService.getApplicationUsers().then(response => {
						/*
						 rootScope is available in all controllers (by injecting $rootScope) and templates (using $root)
						 It can be used for some variable often used in templates/controllers, for example user id
						 Although it is not necessary, because you will have access to 'config' object in every child
						 Do not use rootScope for constants
						 */
						$rootScope.userId = 123;
						$rootScope.isLoading = false;

						response.map(u => u.name = u['first_name'] + ' ' + u['last_name']);

						return response;
					});
				}
			}
		})
		.state('home.landing', {
			url: 'landing',
			component: 'landing',
			resolve: {
				/*
				 Simulating some other async operation using promises
				 As you can see, 'appConfig' from parent state is already available here
				 */
				someAsyncData: (appConfig, $timeout) => {
					return new Promise(resolve => {
						/*
						 $timeout is angular way of doing setTimeout
						 https://docs.angularjs.org/api/ng/service/$timeout
						 */
						$timeout(() => {
							resolve({usersCount: appConfig.length});
						}, 300);
					});
				},
				// You can also resolve non-async stuff
				someData: () => 'simple string'
			}
		})
		.state('home.dashboard', {
			url: 'dashboard',
			component: 'dashboard'
		})
		.state('home.dashboard.users', {
			url: '/users',
			component: 'users'
		})
		.state('home.dashboard.directive', {
			url: '/directive',
			component: 'directiveExample'
		})
		.state('home.dashboard.wrapper', {
			url: '/wrapper',
			component: 'wrapperExample'
		})
		.state('home.dashboard.service', {
			url: '/service',
			component: 'serviceExample'
		})
		.state('home.dashboard.events', {
			url: '/events',
			component: 'eventsExample'
		})
		.state('home.dashboard.stuff', {
			url: '/stuff',
			component: 'stuff'
		});
	// todo
	// events (local and global)

	// Default redirects using 'when'
	$urlRouterProvider.when('/', '/landing');
	$urlRouterProvider.when('/dashboard', '/dashboard/users');

	// Default URL
	$urlRouterProvider.otherwise('/landing');
}