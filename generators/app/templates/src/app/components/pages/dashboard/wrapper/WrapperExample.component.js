/*
 Sometimes you need to build wrappers for other components, for example some heavy libraries
 This is the best way to pass callbacks/models to children and resembles React.js
 */
export const WrapperExample = {
	template: require('./wrapperExample.template.html'),
	controller: class {
		constructor() {
			this.options = ['One', 'Two', 'Three'];
		}

		/*
		 This function is executed from a child component in the context of current scope
		 Sometimes this structure is really useful, because '$scope.$watch' should be avoided
		 */
		onSelectChanged(value) {
			alert(value);
		}
	}
};