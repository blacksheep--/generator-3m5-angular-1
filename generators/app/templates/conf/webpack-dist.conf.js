const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				enforce: 'pre',
				use: [
					{
						loader: 'eslint-loader',
						options: {
							emitError: true,
							failOnWarning: true,
							failOnError: true,
						}
					}
				]
			},
			{
				test: /\.(css|less)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: true,
								discardComments: {
									removeAll: true,
								},
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => [autoprefixer({
									browsers: [
										'> 1%',
										'iOS >= 8',
										'Safari >= 8',
										'last 2 versions',
										'IE 10'
									],
									cascade: false
								})]
							}
						},
						{
							loader: 'less-loader',
						},
					]
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					'babel-loader',
					'webpack-strip-block',
					'ng-annotate-loader',
				]
			},
			{
				test: /.html$/,
				use: [
					'html-loader',
				]
			},
			{
				test: /.txt/,
				use: [
					'raw-loader',
				]
			},
			{
				test: /\.(woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 100000,
						}
					},
				]
			},
			{
				test: /\.(png|gif|jpg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 100000,
						}
					},
				]
			},
			{
				test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
				use: [
					'file-loader',
				]
			}
		]
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			options: {
				context: __dirname,
				failOnError: true,
			}
		}),
		new webpack.DefinePlugin({'process.env.ENV': JSON.stringify('prod')}),
		new webpack.ProvidePlugin({'moment': 'moment', 'humanizeDuration': 'humanize-duration'}),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: true
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true
			},
			output: {
				comments: false,
			},
			mangle: false,
		}),
		new ExtractTextPlugin({
			filename: 'index-[contenthash].css',
			allChunks: true,
		})
	],
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
	bail: true
};
