const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(process.cwd());

config.resolver = {
  ...config.resolver,
  alias: {
    '@/': './',
  },
};

module.exports = config;