import angular from 'angular';
import users from './users.json';

export class restService {
	constructor($http, $rootScope, constants) {
		// Using angular extend to make injected dependencies available in every class method (with 'this')
		angular.extend(this, {$http, $rootScope, constants});
	}

	getApplicationUsers() {
		// Simulate ajax request
		return new Promise(resolve => {
			resolve(users);
		});
	}

	addPost(request) {
		return this.$http.post('http://reqres.in/api/users', request);
	}
}