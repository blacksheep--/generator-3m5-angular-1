import angular from 'angular';

export const EventsExample = {
	template: require('./eventsExample.template.html'),
	controller: class {
		constructor($scope, $rootScope) {
			angular.extend(this, {$scope, $rootScope});
		}

		onAppLevelEventClicked() {
			/*
			 $rootScope.$emit only lets other $rootScope listeners catch it.
			 This is good when you don't want every $scope to get it. Mostly a high level communication.
			 Listener is in AppHeader
			 */
			this.$rootScope.$emit('appLevelEvent', {someData: 123});
		}

		onScopeBroadcastClicked() {
			/*
			 $scope.$broadcast is for the $scope itself and its children.
			 This is a child whispering to its stuffed animals so their parents can't hear.
			 */
			this.$scope.$broadcast('toChildrenEvent');
		}

		onScopeEmitClicked() {
			/*
			 $scope.$emit is when you want that $scope and all its parents and $rootScope to hear the event.
			 */
			this.$scope.$emit('toParentsEvent');
		}
	}
};