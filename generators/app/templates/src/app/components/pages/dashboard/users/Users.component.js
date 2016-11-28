import angular from 'angular';

export const Users = {
	template: require('./users.template.html'),
	bindings: {
		/*
		 You can also rename passed variables
		 In this example 'users' receives the value of 'appConfig'
		 */
		users: '<appConfig'
	},
	controller: class {
		constructor($scope, $rootScope, constants) {
			// Using angular extend to make injected dependencies available in every class method (with 'this')
			angular.extend(this, {$scope, $rootScope, constants});
		}

		onUserAddClicked() {
			this.addingMode = true;
		}

		onUserSubmitted() {
			if (!this.$scope.myForm.$valid) {
				// Do nothing if form is invalid
				return;
			}

			// Because of two-way data binding the 'user' ng-model is already populated with all the data from template
			// And every time we change 'users' array the view will be automatically re-rendered
			this.users.push(this.user);

			// Reset form after submitting
			this.user = {};
			this.$scope.myForm.$setPristine();
			this.$scope.myForm.$setUntouched();
		}
	}
};