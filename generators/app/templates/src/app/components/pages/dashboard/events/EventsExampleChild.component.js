export const EventsExampleChild = {
	template: '<div>{{ $ctrl.eventCaught }}</div>',
	controller: class {
		constructor($scope) {
			$scope.$on('toChildrenEvent', () => {
				this.eventCaught = 'Event caught in child component';
			});
		}
	}
};