export class ButtonSpinner {
	constructor() {
		/*
		 If template is really small you can use simple strings or ES6 template strings
		 Using transclude we keep the contents of an element and append spinner
		 */
		this.template = `<div>
			<ng-transclude></ng-transclude>
			<span class="button-spinner" ng-show="loading">&#8987;</span>
		</div>`;

		this.restrict = 'A';
		this.replace = false;
		this.transclude = true;
		this.scope = {
			loading: '=buttonSpinner'
		};
	}

	link(scope, element) {

	}
}