const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');

const sharedMappings = new mf.SharedMappings();
const workspaceRootPath = path.join(__dirname, '../../');

sharedMappings.register(
	path.join(__dirname, '../../tsconfig.json'),
	[
		// 'angular-core',
	],
	workspaceRootPath
);

module.exports = {
	output: {
		uniqueName: 'web',
		publicPath: 'auto',
	},
	optimization: {
		runtimeChunk: false,
	},
	experiments: {
		outputModule: true,
	},
	resolve: {
		alias: {
			...sharedMappings.getAliases(),
		},
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'web',
			library: { type: 'module' },
			remotes: {
				panelApp: 'panelApp@http://localhost:8001/remoteEntry.js',
			},

			shared: {
				...mf.shareAll({
					singleton: true,
					strictVersion: true,
					requiredVersion: "auto",
				}),
			}
		}),
		sharedMappings.getPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.pug$/,
				use: [
					{
						loader: '@webdiscus/pug-loader',
						options: {
							method: 'render',
							doctype: 'html',
							plugins: [require('pug-plugin-ng')],

						}
					},
					{
						loader: path.resolve(__dirname, './prepend-mixin-loader.js')
					}
				]
			},
			{
				test: /\.(png|jpg|jpeg)/,
				type: 'asset/resource',
			},
		],
	},
};
