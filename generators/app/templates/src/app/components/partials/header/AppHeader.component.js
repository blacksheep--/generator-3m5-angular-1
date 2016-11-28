import angular from 'angular';

import './appHeader.less';

export const AppHeader = {
	template: require('./appHeader.template.html'),
	bindings: {
		// We passed some data from parent template and use bindings to use it in controller/template
		'somePassedData': '<'
	},
	controller: class {
		constructor($rootScope, $state) {
			angular.extend(this, {$state});

			$rootScope.$on('appLevelEvent', (event, someData) => {
				this.different = true;
			});
		}

		// This is an example of how you can programmatically transition to other states with router
		onClicked() {
			this.$state.go('home.landing');
		}
	}
};