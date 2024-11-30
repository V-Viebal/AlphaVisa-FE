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
		uniqueName: 'panel-app',
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
			name: 'panel',
			library: { type: 'module' },
			name: 'panel-app',
			filename: 'remoteEntry.js',
			exposes: {
				'./web-components': 'apps/panel/src/bootstrap.ts', // bootstrap --> main --> AppModule --> WebComp
			},
			shared: {
				...mf.shareAll({
					singleton: true,
					strictVersion: true,
					requiredVersion: 'auto',
				}),
				...sharedMappings.getDescriptors(),
			},
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
