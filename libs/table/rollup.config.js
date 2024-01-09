'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function getRollupOptions(options) {
  try {
    const resolve = require('@rollup/plugin-node-resolve');
    const replace = require('@rollup/plugin-replace');
    const image = require('@rollup/plugin-image');
    options.plugins = [
      resolve(),
      replace({ 'Reflect.decorate': 'undefined', preventAssignment: true }),
      image(),
      ...options.plugins,
    ];
  } catch {
    // Ignored for React Native
  }
  return options;
}
module.exports = getRollupOptions;
