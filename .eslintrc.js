module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  rules: {
    // Add or modify rules here if needed
    'react/react-in-jsx-scope': 'off', // Not needed with Next.js
    'react/prop-types': 'off', // We're using TypeScript for prop validation
    '@typescript-eslint/no-explicit-any': 'warn', // Warn about 'any' usage
    'semi': ['error', 'always'], // Require semicolons
    '@typescript-eslint/no-unused-vars': ['warn'], // Warn about unused vars
    
    // Allow React Three Fiber props
    'react/no-unknown-property': ['error', { 
      ignore: [
        'position', 'args', 'transparent', 'blending', 'attach', 'array', 
        'count', 'itemSize', 'sizeAttenuation', 'vertexColors', 'depthWrite',
        'depthTest', 'vertexColors', 'flatShading', 'roughness', 'metalness',
        'emissive', 'color', 'intensity', 'rotation', 'castShadow', 'receiveShadow',
        'fog', 'toneMapped', 'points'
      ]
    }]
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  // Ignore CSS linting errors for Tailwind directives
  overrides: [
    {
      files: ['*.css'],
      rules: {
        'no-undef': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
}; 