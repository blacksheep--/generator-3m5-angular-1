export const Dashboard = {
	template: require('./dashboard.template.html'),
	controller: class {
		constructor($scope, $rootScope) {
			// Every scope variable (this.bla) is available in template inside of $ctrl object ($ctrl.bla)
			this.hello = 'Hello';

			$rootScope.documentTitle = 'Dashboard';

			$scope.$on('toParentsEvent', () => {
				alert('Caught event in parent view (Dashboard)');
			});
		}
	}
};