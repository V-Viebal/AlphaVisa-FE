const {
	shareAll,
	withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
	name: 'mfe1',

	exposes: {
		'./Module': './apps/panel/src/app/panel/panel.module.ts',
	},

	shared: {
		...shareAll({
			singleton: true,
			strictVersion: true,
			requiredVersion: 'auto',
		}),
	},

	webpackFinal: (config) => {
		config.module.rules.push(
			{
				test: /\.pug$/,
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
						loader: path.resolve(__dirname, './prepend-mixin-loader.js'),
					},
				],
			},
			{
				test: /\.(png|jpg|jpeg)/,
				type: 'asset/resource',
			}
		);

		return config;
	},
});
