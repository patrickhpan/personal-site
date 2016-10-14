const fs = require('fs');
const dotenv = require('dotenv');
const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const envFile = fs.readFileSync('.env', 'utf8');

const SETTINGS = {
	DEVTOOL: process.env.WEBPACK_DEVTOOL || 'source-map',
	SRCDIR: path.join(__dirname, '..', 'client'),
	OUTDIR: path.join(__dirname, '..', 'build')
}

module.exports = {
	entry: [
		'webpack/hot/dev-server',
		'webpack-hot-middleware/client',
		path.join(SETTINGS.SRCDIR, 'bundle.jsx')
	],
	devtool: SETTINGS.DEVTOOL,
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
	devServer: {
		contentBase: SETTINGS.OUTDIR,
		noInfo: true,
		hot: true,
		inline: true
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new CopyWebpackPlugin([{
			from: path.join(SETTINGS.SRCDIR, 'index.html')
		}]),
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(dotenv.parse(envFile))
		})
	],
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		dns: 'empty'
	},
	_port: 9000
};