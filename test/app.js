'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-3m5-angular-1:app', function() {
	before(function() {
		return helpers.run(path.join(__dirname, '../generators/app'))
			.withPrompts({someAnswer: true})
			.toPromise();
	});
});
