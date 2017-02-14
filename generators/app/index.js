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
				type: 'list',
				name: 'buildSystem',
				message: 'Which build system do you want to use?',
				choices: ['Grunt', 'gulp']
			},
			{
				type: 'confirm',
				name: 'installDependencies',
				message: 'Install dependencies?'
			}
		]).then(function(answers) {
			this.answers = answers;
		}.bind(this));
	},

	writing: function() {
		this.copy('.babelrc', '.babelrc');
		this.copy('.npmignore', '.npmignore');
		this.copy('_gitignore', '.gitignore');
		this.copy('.jshintrc', '.jshintrc');
		this.copy('.editorconfig', '.editorconfig');
		this.copy('Gruntfile.js', 'Gruntfile.js');
		this.copy('package.json', 'package.json');
		this.copy('src/index.html', 'src/index.html');
		this.copy('src/index.js', 'src/index.js');

		this.fs.copyTpl(glob.sync(this.templatePath('src/app/**'), {dot: true}), 'src/app', this.answers);
		this.fs.copyTpl(glob.sync(this.templatePath('src/tests/**'), {dot: true}), 'src/tests', this.answers);

		this.directory('src/assets', 'src/assets');

		this.fs.copyTpl(glob.sync(this.templatePath('conf/**'), {dot: true}), 'conf', this.answers);
	},

	install: function() {
		if (this.answers.installDependencies) {
			this.installDependencies();
		}
	}
});
