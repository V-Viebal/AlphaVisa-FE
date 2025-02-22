// projects/shell/webpack.config.js

const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const { merge } = require('webpack-merge');

// 1) Create your Module Federation config (can be an object or function).
const federationPlugin = withModuleFederationPlugin({
  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },
});

module.exports = (config, options) => {
  // 2) If the federation plugin is a function, call it; otherwise just use it as-is.
  const federationConfig = typeof federationPlugin === 'function'
    ? federationPlugin(config, options)
    : federationPlugin;

  // 3) Define your Pug loader rules
  const pugLoaderConfig = {
    module: {
      rules: [
        {
          test: /\.pug(\?.*)?$/,
          use: [
            {
              loader: '@webdiscus/pug-loader',
              options: {
                method: 'render',  // or 'compile' if you prefer
                doctype: 'html',
              },
            },
            // If you have a custom loader, add it here
            // { loader: path.resolve(__dirname, 'prepend-mixin-loader.js') }
          ],
        },
        {
          test: /\.(png|jpe?g)$/,
          type: 'asset/resource',
        },
      ],
    },
  };

  // 4) Merge everything: the original Angular CLI config, the federation config, and your Pug loader
  return merge(config, federationConfig, pugLoaderConfig);
};
