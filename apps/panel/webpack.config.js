const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const { shareAll } = require('@angular-architects/module-federation/webpack');

// IMPORTANT: Export a plain Webpack config object — Nx merges this with the CLI config.
module.exports = {
	// Basic config needed for Module Federation
	output: {
		uniqueName: 'panel',
		publicPath: 'auto',
	},
	optimization: {
		runtimeChunk: false,
	},

	// Add your custom rules here (no webpackFinal())
	module: {
		rules: [
			// 1) Pug loader to handle .pug or .pug?ngResource=123, etc.
			{
				test: /\.pug(\?.*)?$/, // Match .pug + any query string
				use: [
					{
						loader: '@webdiscus/pug-loader',
						options: {
							method: 'render',
							doctype: 'html',
							plugins: [require('pug-plugin-ng')],
						},
					},
					{
						// Example of your custom loader
						loader: path.resolve(
							__dirname,
							'./prepend-mixin-loader.js'
						),
					},
				],
			},

			// 2) Example: images
			{
				test: /\.(png|jpg|jpeg)$/,
				type: 'asset/resource',
			},
		],
	},

	// Use ModuleFederationPlugin for Micro Frontends
	plugins: [
		new ModuleFederationPlugin({
			// Change to match your MFE setup
			name: 'panel',
			filename: 'remoteEntry.js',
			exposes: {
				'./Module': path.resolve(__dirname, 'apps/panel/src/app/panel/panel.module.ts'),
			},
			// Share dependencies automatically
			shared: shareAll({
				singleton: true,
				strictVersion: true,
				requiredVersion: 'auto',
			}),
		}),
	],
};
