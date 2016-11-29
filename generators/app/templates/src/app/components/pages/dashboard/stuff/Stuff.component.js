export const Stuff = {
	template: require('./stuff.template.html'),
	controller: class {
		constructor(stateService) {
			this.persistent = stateService.persistent;
		}
	}
};