const fs = require('fs');
const dotenv = require('dotenv');
const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const envFile = fs.readFileSync('.env', 'utf8');

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
		new CopyWebpackPlugin([{
			from: path.join(SETTINGS.SRCDIR, 'index.html')
		}]),
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(Object.assign(dotenv.parse(envFile), {
				NODE_ENV: 'production'
			}))
		})
	],
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		dns: 'empty'
	},
};