import angular from 'angular';

export const EventsExample = {
	template: require('./eventsExample.template.html'),
	controller: class {
		constructor($rootScope) {
			angular.extend(this, {$rootScope});
			/*
			 Angular has an event system, but it should not be overused
			 Only use this if all other methods of communication between components do not work
			 */
		}

		onAppLevelEventClicked() {
			this.$rootScope.$emit('appLevelEvent', {someData: 123});
		}
	}
};