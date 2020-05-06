const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = function override(config, ev) {
  return {
    ...config,
    plugins: config.plugins.map(plugin => {
      if (plugin.constructor.name === 'GenerateSW') {
        return new WorkboxWebpackPlugin.InjectManifest({
          swSrc: './src/sw.ts',
          swDest: 'sw.js',
        });
      }

      return plugin;
    }),
  };
};
