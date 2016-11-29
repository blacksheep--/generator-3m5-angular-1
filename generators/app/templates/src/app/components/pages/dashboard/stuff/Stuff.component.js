export const Stuff = {
	template: require('./stuff.template.html'),
	controller: class {
		constructor(stateService, ngDialog) {
			this.persistent = stateService.persistent;
			this.ngDialog = ngDialog;
		}

		onOpenPopupClicked() {
			/*
			 Example popup using external ngDialog library
			 https://github.com/likeastore/ngDialog
			 */
			this.ngDialog.open({
				template: require('./stuffPopup.template.html'),
				plain: true,
				className: 'ngdialog-theme-default',
				controller: class {
					constructor($scope) {
						$scope.someVariable = 'my variable';
						// console.info($scope.closeThisDialog);
					}
				}
			});
		}
	}
};