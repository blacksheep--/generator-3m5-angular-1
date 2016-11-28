const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'jshint'
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
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style',
					loader: 'css!less!postcss'
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: [
					'babel',
					'webpack-strip-block',
					'ng-annotate',
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
				loader: 'url?limit=10000',
			},
			{
				test: /\.(png|gif|jpg)$/,
				loader: 'url-loader?limit=10000'
			},
			{
				test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
				loader: 'file',
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({'process.env.ENV': JSON.stringify('prod')}),
		new webpack.ProvidePlugin({'moment': 'moment', 'humanizeDuration': 'humanize-duration'}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: true
		}),
		new ExtractTextPlugin('index-[contenthash].css')
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
	output: {
		path: path.join(process.cwd(), 'dist'),
		filename: '[name]-[hash].js'
	},
	resolve: {
		alias: {
			helpers: path.join(__dirname, '../src/app/helpers'),
			stylesheets: path.join(__dirname, '../src/app/stylesheets'),
			assets: path.join(__dirname, '../src/assets')
		}
	},
	entry: {
		app: ['./src/index']
	},
	jshint: {
		emitErrors: true,
		failOnHint: true
	},
	failOnError: true,
	bail: true
};
