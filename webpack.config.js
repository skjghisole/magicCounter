const path = require('path');
const webpack = require('webpack');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */

const srcPath = path.resolve(`${process.cwd()}/src/`);
const publicPath = path.resolve(`${process.cwd()}/public/`);

module.exports = {
	mode: 'development',

	entry: {
		index: path.join(`${process.cwd()}/src/frontend/index.jsx`)
	},

	output: {
		filename: '[name].[chunkhash].js',
		path: path.join(`${publicPath}`),
    	publicPath: '/',
	},

	plugins: [new webpack.ProgressPlugin(), new HtmlWebpackPlugin({ template: path.join(`${process.cwd()}/template/index.html`)})],

	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',

				options: {
					plugins: ['syntax-dynamic-import'],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				}
			},
		    {
		        test: /\.*css$/,
		        use: [
		          {
		            loader: 'style-loader',
		          },
		          {
		            loader: 'css-loader',
		          },
		          {
		            loader: 'sass-loader',
		          },
	        	],
	      	},
		]
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},

  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },

	devServer: {
		open: true
	}
};
