// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add resolution for React Native modules
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs', 'cjs'];
config.resolver.assetExts = [...config.resolver.assetExts, 'db', 'sqlite'];

// Ensure React Native can find the native modules
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'react-native': __dirname + '/node_modules/react-native',
  'expo': __dirname + '/node_modules/expo',
  '@react-navigation/native': __dirname + '/node_modules/@react-navigation/native',
  'expo-router': __dirname + '/node_modules/expo-router',
};

module.exports = config;
