import angular from 'angular';

export class restService {
	constructor($http, $rootScope, constants) {
		// Using angular extend to make injected dependencies available in every class method (with 'this')
		angular.extend(this, {$http, $rootScope, constants});
	}

	getApplicationUsers() {
		return this.$http.get('http://reqres.in/api/users').then(response => response.data.data);
	}

	addPost(request) {
		return this.$http.post('http://reqres.in/api/users', request);
	}
}