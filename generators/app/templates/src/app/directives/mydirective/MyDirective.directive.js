/*
 You should use angular components if possible (like 99% of the time), but in some cases components are not enough, then you should use directives
 You can read about differences between components and directives here:
 https://docs.angularjs.org/guide/component

 Directives are for example necessary when you need access to DOM elements and overall have more control

 A good tutorial about directives:
 https://code.tutsplus.com/tutorials/mastering-angularjs-directives--cms-22511

 Here is an example of how directive can be written using es6 classes
 */
export class MyDirective {
	constructor() {
		this.template = require('./myDirective.template.html');

		/*
		 We can use this directive as an attribute (<div my-directive></div>)
		 Another example of what is not possible with components only
		 */
		this.restrict = 'A';

		this.replace = false;
		this.scope = {
			currentTime: '<'
		};
	}

	// This is how you inject dependencies
	controller($scope, restService) {
		$scope.restService = restService;
	}

	link(scope, element) {
		/*
		 Your injected service is available here: scope.restService
		 console.info(scope.restService);
		 */

		/*
		 jqLite is a tiny replacement for jQuery that allows Angular to manipulate the DOM in a cross-browser compatible way.
		 jqLite implements only the most commonly needed functionality.
		 https://docs.angularjs.org/api/ng/function/angular.element
		 */
		this.element = element;

		// Let's do something  every time 'currentTime' variable changes
		scope.$watch('currentTime', () => {
			this.currentTime = scope.currentTime;

			/*
			 This is kinda bad example, because you can do the same without any DOM manipulation
			 But imagine you need to inject some crazy D3 chart and angular wrapper is not available
			 */
			this.element.find('time').html(this.currentTime);
		});
	}
}