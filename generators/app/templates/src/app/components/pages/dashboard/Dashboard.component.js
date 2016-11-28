export const Dashboard = {
	template: require('./dashboard.template.html'),
	controller: class {
		constructor($rootScope) {
			// Every scope variable (this.bla) is available in template inside of $ctrl object ($ctrl.bla)
			this.hello = 'Hello';

			$rootScope.documentTitle = 'Dashboard';
		}
	}
};