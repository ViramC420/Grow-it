const { merge } = require("webpack-merge");
const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  // DEFAULT EXPO CONFIG
  const config = await createExpoWebpackConfigAsync(env, argv);

  // AGGRESSIVE CODE SPLITTING
  config.optimization = merge(config.optimization || {}, {
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        // NODE IN VENDORS CHUNK
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const pkg = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `vendors.${pkg.replace("@", "")}`;
          },
        },
      },
    },
  });

  // RETURN ALTER CONFIG
  return config;
};
