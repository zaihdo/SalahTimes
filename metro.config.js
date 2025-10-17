const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(process.cwd());

// Optimize file watching
config.watchFolders = [process.cwd()];
config.resolver.assetExts.push('db'); // Add any custom extensions

// Reduce watched file types
config.resolver.sourceExts = ['js', 'jsx', 'ts', 'tsx', 'json'];

module.exports = config;