import angular from 'angular';
import {requireAllComponentsFromDirectory} from '../helpers/helpers';

export const components = 'app.components';
var module = angular.module(components, []);

/*
This script tries to automagically require all .component.js files inside of this folder
Although it is not necessary, it helps when you project grows and manually importing each component becomes a hassle
But you can always do it manually like in 'services.js'
 */

var directory = require.context('./', true, /^\.\/((?!components).)*\.component\.js$/);

requireAllComponentsFromDirectory(directory, module);