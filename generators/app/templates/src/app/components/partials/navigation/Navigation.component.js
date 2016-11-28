export const Navigation = {
	template: require('./navigation.template.html'),
	controller: class {
		constructor() {
			/*
			 Every class variable (this.bla) is available in template inside of $ctrl object ($ctrl.bla)
			 */
			this.navigation = [
				{
					key: 'users',
					label: 'List and forms'
				},
				{
					key: 'directive',
					label: 'Directive'
				},
				{
					key: 'wrapper',
					label: 'Wrapper'
				},
				{
					key: 'service',
					label: 'Service and loader'
				},
				{
					key: 'events',
					label: 'Event management'
				},
				{
					key: 'stuff',
					label: 'Other stuff'
				}
			];
		}
	}
};