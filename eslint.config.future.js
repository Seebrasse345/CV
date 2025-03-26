// This is a stub for future ESLint v9 configuration
// When ready to migrate, rename this file to eslint.config.js
// and remove the .eslintrc.js file

// Example ESLint v9 configuration
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import nextPlugin from '@next/eslint-plugin-next';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@typescript-eslint': typescriptPlugin,
      '@next/next': nextPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Core rules
      'semi': ['error', 'always'],
      
      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unknown-property': ['error', { 
        ignore: [
          'position', 'args', 'transparent', 'blending', 'attach', 'array', 
          'count', 'itemSize', 'sizeAttenuation', 'vertexColors', 'depthWrite',
          'depthTest', 'vertexColors', 'flatShading', 'roughness', 'metalness',
          'emissive', 'color', 'intensity', 'rotation', 'castShadow', 'receiveShadow',
          'fog', 'toneMapped', 'points'
        ]
      }],
      
      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      
      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  // CSS files override
  {
    files: ['**/*.css'],
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
]; 