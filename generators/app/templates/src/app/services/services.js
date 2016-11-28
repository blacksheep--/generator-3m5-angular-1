import angular from 'angular';
import {restService} from './rest.service';

export const services = 'app.services';

angular
	.module(services, [])
	.service('restService', restService)
	.factory('stateService', () => {
		return {persistent: {}};
	});