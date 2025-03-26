// This is a minimal ESLint v9 configuration that redirects to the existing .eslintrc.js file
// This ensures compatibility with both ESLint v8 (which uses .eslintrc.js) and ESLint v9 (which uses eslint.config.js)

try {
  const { FlatCompat } = require('@eslint/eslintrc');
  const path = require('node:path');

  const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: {},
  });

  module.exports = [
    ...compat.config({ extends: [path.resolve(__dirname, '.eslintrc.js')] })
  ];
} catch (error) {
  // Fallback configuration if @eslint/eslintrc is not available
  console.log('Warning: @eslint/eslintrc module not found, using empty config.');
  module.exports = [];
} 