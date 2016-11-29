/* yo:start */
// <% if (comments) { %>
//
// <% } %>
/* yo:end */

/*
 Polyfill for unsupported browser features, crucial for IE11
 https://babeljs.io/docs/usage/polyfill/
 */
import 'babel-polyfill';

// All installed libraries must be imported first
import angular from 'angular';
import 'angular-ui-router';
import 'angular-ui-router/release/stateEvents';
import 'angular-translate';
import 'ng-dialog';

/*
 Localize for german language (currencies, dates, numbers)
 https://docs.angularjs.org/guide/i18n
 */
import 'angular-i18n/angular-locale_de';

/*
 Import css files from js using css-loader
 https://github.com/webpack/css-loader
 CSS is by default injected into global namespace
 */
import './app/stylesheets/common.less';

// Components, services, filters
import {components} from './app/components/components';
import {directives} from './app/directives/directives';
import {services} from './app/services/services';
import {filters} from './app/filters/filters';

// Import configuration files
import {routesConfig} from './app/config/routes.config';
import {ajaxConfig} from './app/config/ajax.config';
import {i18nConfig} from './app/config/i18n.config';

// -------------------------
// Main app module
// -------------------------
var app = angular.module('app',
	[
		// Inject imported libraries by their unique names into our application
		'ui.router',
		'ui.router.state.events',
		'pascalprecht.translate',
		'ngDialog',
		components,
		directives,
		services,
		filters
	]);

app
	// Router
	.config(routesConfig)
	/*
	 Translations using angular-translate
	 https://angular-translate.github.io/docs/#/guide/02_getting-started
	 */
	.config(i18nConfig)
	// Interceptors and ajax caching
	.config(ajaxConfig)
	/*
	 Global constants
	 They can be injected by 'constants' name in any controller
	 */
	.constant('constants', {
		SOME_GLOBAL_CONSTANT: 'I am available in everywhere'
	})
	.run($rootScope => {
		/*
		 Run blocks are the closest thing in Angular to the main method.
		 A run block is the code which needs to run to kickstart the application.
		 It is executed after all of the services have been configured and the injector has been created.
		 */
		$rootScope.isLoading = true;
	});

/* develblock:start */
{
	var devOnly = 'Every code inside the "develblock" will be deleted from live build';
}
/* develblock:end */