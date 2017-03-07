const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
	watch: true,
	module: {
		rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: "pre",
                use: [
                    {
                        loader: 'jshint-loader',
                    },
                    {
                        loader: 'webpack-strip-block',
                        options: {
                            start: 'yo:start',
                            end: 'yo:end',
                        }
                    },
                ]
            },
			{
				test: /\.(css|less)$/,
				use: [
					{
						loader: 'style-loader'
                    },
					{
						loader: 'css-loader',
						options: {
                            sourceMap: true,
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
                        options: {
                            sourceMap: true,
                        }
                    }
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					'ng-annotate-loader',
					'babel-loader'
				]
			},
			{
				test: /.html$/,
				use: [
					'html-loader'
				]
			},
			{
				test: /.txt/,
				use: [
					'raw-loader'
				]
			},
			{
				test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 100000
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
                            limit: 100000
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
                debug: true,
            }
        }),
		new webpack.DefinePlugin({'process.env.ENV': JSON.stringify('dev')}),
		new webpack.ProvidePlugin({'moment': 'moment', 'humanizeDuration': 'humanize-duration'}),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: true
		})
	],
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
