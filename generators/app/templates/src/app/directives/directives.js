import angular from 'angular';
import {MyDirective} from './mydirective/MyDirective.directive';
import {ButtonSpinner} from './buttonspinner/ButtonSpinner.directive';

export const directives = 'app.directives';

angular
	.module(directives, [])
	.directive('myDirective', () => new MyDirective())
	.directive('buttonSpinner', () => new ButtonSpinner());