export const SimpleSelect = {
	template: require('./simpleSelect.template.html'),
	bindings: {
		/*
		 '<' is one-way (one-directional) binding. It is similar to props in React.js and will not affect parent scope.
		 */
		options: '<',

		/*
		 Using bidirectional binding to pass ng-model and ng-required
		 Every time model is changed here it will also change in parent component (and other way around)
		 */
		ngModel: '=',
		ngRequired: '=',

		/*
		 '&' provides a way to execute an expression in the context of the parent scope
		 In our example we pass a method
		 */
		parentChanged: '&'

		/*
		 More info on bindings & scope:
		 https://docs.angularjs.org/api/ng/service/$compile#-scope-
		 */
	}
};