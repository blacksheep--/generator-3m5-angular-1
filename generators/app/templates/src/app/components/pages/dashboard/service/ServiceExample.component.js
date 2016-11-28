import angular from 'angular';

export const ServiceExample = {
	template: require('./serviceExample.template.html'),
	controller: class {
		constructor(restService) {
			angular.extend(this, {restService});
		}

		onCreatePostClicked() {
			this.loadingPost = true;

			this.restService.addPost({
				'name': 'morpheus',
				'job': 'leader'
			}).then(response => {
				this.response = `${response.status} ${response.statusText}`;
				console.info(this.response);
			}).catch(error => {
				// in case of error
			}).finally(() => {
				console.info('finally');
				// execute always
				this.loadingPost = false;
			});
		}
	}
};