const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(process.cwd());
  const { transformer, resolver } = config;
  return {
    ...config,
    transformer: {
      ...transformer,
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      ...resolver,
      assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...resolver.sourceExts, 'svg'],
    },
  };
})();