import './landing.less';

export const Landing = {
	template: require('./landing.template.html'),
	// https://docs.angularjs.org/api/ng/service/$compile#-scope-
	/*

	 */
	bindings: {
		appConfig: '<',
		someAsyncData: '<',
		someData: '<'
	},
	controller: class {
		constructor($rootScope) {
			/*
			 As you can see, every variable from 'resolve' blocks is already available inside of controller
			 */
			console.info(this.appConfig);
			console.info(this.someAsyncData);
			console.info(this.someData);

			$rootScope.documentTitle = 'Landing';
		}
	}
};