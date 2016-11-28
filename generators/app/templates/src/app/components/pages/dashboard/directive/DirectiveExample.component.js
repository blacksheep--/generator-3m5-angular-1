import moment from 'moment';

export const DirectiveExample = {
	template: require('./directiveExample.template.html'),
	controller: class {
		constructor($interval) {
			$interval(() => {
				this.time = moment().format('HH:mm:ss');
			}, 100);
		}
	}
};