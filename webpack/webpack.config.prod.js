var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const SETTINGS = {
	SRCDIR: path.join(__dirname, '..', 'client'),
	OUTDIR: path.join(__dirname, '..', 'build')
}

module.exports = {
	entry: [
		path.join(SETTINGS.SRCDIR, 'bundle.jsx')
	],
	output: {
		path: SETTINGS.OUTDIR,
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: loaders
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				from: path.join(SETTINGS.SRCDIR, 'index.html')
			}
		]),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		})
	]
};