var webpackDev = require('./conf/webpack.conf');
var webpackDist = require('./conf/webpack-dist.conf');

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		// Compile js/css for live environment
		webpack: {
			dist: webpackDist
		},
		// Start server in dev environment
		'webpack-dev-server': {
			options: {
				webpack: webpackDev,
				inline: true,
				keepAlive: true,
				watchOptions: {
					aggregateTimeout: 100,
					poll: 500
				},
				contentBase: './tmp'
			},
			dev: {}
		},
		// Copy everything from assets folder
		copy: {
			'assets-dev': {
				files: [
					{expand: true, cwd: 'src/', src: ['assets/**'], dest: '.tmp/'},
				]
			},
			'assets-dist': {
				files: [
					{expand: true, cwd: 'src/', src: ['assets/**'], dest: 'dist/'},
				]
			}
		},
		// Watch for changes in assets folder and copy them afterwards
		watch: {
			assets: {
				files: ['src/assets/**'],
				tasks: ['clean:assets-dev', 'copy:assets-dev'],
				options: {
					spawn: false
				},
			},
		},
		clean: {
			'assets-dev': ['.tmp/assets']
		},
		// Start all these tasks in parallel
		concurrent: {
			target: {
				tasks: ['copy:assets-dev', 'webpack-dev-server:dev', 'watch:assets'],
				options: {
					logConcurrentOutput: true
				}
			},
		}
	});

	grunt.registerTask('dev', ['concurrent:target']);
	grunt.registerTask('dist', ['copy:assets-dist', 'webpack:dist']);

};