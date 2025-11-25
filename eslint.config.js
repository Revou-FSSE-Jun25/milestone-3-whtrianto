const { resolve } = require('path');

module.exports = {
  root: true,
  extends: ['next/core-web-vitals'],
  parserOptions: {
    project: resolve(__dirname, './tsconfig.json'),
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-function': 'off'
  },
  ignores: ['**/*.js', '**/*.mjs', 'next.config.*']
}