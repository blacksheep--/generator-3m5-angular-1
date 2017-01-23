const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
	watch: true,
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: [
					'jshint',
					'webpack-strip-block?start=yo:start&end=yo:end',
				]
			}
		],
		loaders: [
			{
				test: /.json$/,
				loaders: [
					'json'
				]
			},
			{
				test: /\.(css|less)$/,
				loaders: [
					'style',
					'css?sourceMap',
					'less?sourceMap',
					'postcss'
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: [

					'ng-annotate',
					'babel'
				]
			},
			{
				test: /.html$/,
				loaders: [
					'html'
				]
			},
			{
				test: /.txt/,
				loaders: [
					'raw'
				]
			},
			{
				test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url?limit=4000',
			},
			{
				test: /\.(png|gif|jpg)$/,
				loader: 'url?limit=4000'
			},
			{
				test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
				loader: 'file',
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({'process.env.ENV': JSON.stringify('dev')}),
		new webpack.ProvidePlugin({'moment': 'moment', 'humanizeDuration': 'humanize-duration'}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.NoErrorsPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: true
		})
	],
	postcss: () => [autoprefixer({
		browsers: [
			'> 1%',
			'iOS >= 8',
			'Safari >= 8',
			'last 2 versions',
			'IE 10'
		],
		cascade: false
	})],
	debug: true,
	devtool: 'inline-source-map',
	output: {
		path: path.join(process.cwd(), '.tmp'),
		filename: 'index.js',
		publicPath: '/'
	},
	resolve: {
		alias: {
			helpers: path.join(__dirname, '../src/app/helpers'),
			stylesheets: path.join(__dirname, '../src/app/stylesheets'),
			assets: path.join(__dirname, '../src/assets')
		}
	},
	entry: ['./src/index']
};
