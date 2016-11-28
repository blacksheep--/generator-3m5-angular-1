var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var glob = require('glob');

module.exports = yeoman.Base.extend({
	prompting: function() {
		return this.prompt([
			{
				type: 'input',
				name: 'appName',
				message: 'Project name'
			},
			{
				type: 'confirm',
				name: 'comments',
				message: 'With detailed comments?'
			},
			{
				type: 'confirm',
				name: 'installDependencies',
				message: 'Install dependencies?'
			},
			{
				type: 'list',
				name: 'buildSystem',
				message: 'Which build system do you want to use?',
				choices: ['Grunt', 'gulp']
			}
		]).then(function(answers) {
			this.answers = answers;
		}.bind(this));
	},

	writing: function() {
		this.copy('.babelrc', '.babelrc');
		this.copy('.gitignore', '.gitignore');
		this.copy('.jshintrc', '.jshintrc');
		this.copy('.editorconfig', '.editorconfig');
		this.copy('Gruntfile.js', 'Gruntfile.js');
		this.copy('package.json', 'package.json');

		this.fs.copyTpl(glob.sync(this.templatePath('src/**'), {dot: true}), 'src', this.answers);
	},

	install: function() {
		if (this.answers.installDependencies) {
			this.installDependencies();
		}
	}
});
