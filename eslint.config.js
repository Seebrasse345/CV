// This is a minimal ESLint v9 configuration that redirects to the existing .eslintrc.js file
// This ensures compatibility with both ESLint v8 (which uses .eslintrc.js) and ESLint v9 (which uses eslint.config.js)

const { FlatCompat } = require('@eslint/eslintrc');
const path = require('node:path');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {},
});

module.exports = [
  ...compat.config({ extends: [path.resolve(__dirname, '.eslintrc.js')] })
]; 