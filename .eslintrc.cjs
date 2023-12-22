const airbnbRules = require('eslint-config-airbnb-base/rules/imports');

const airbnbNoExtraDepsRule = airbnbRules.rules['import/no-extraneous-dependencies'];
airbnbNoExtraDepsRule[1].devDependencies.push(
  'src/**/vite.config.{js,ts}',
  '**/packageMeta.{js,ts}',
  'src/vanilla/vanilla-vite.config.{js,ts}',
  '**/*.test.{js,ts}',
  '{vite,vitest}.config.{js,ts}',
  'lib/**/*.{js,ts}',
);

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  plugins: ['import', '@typescript-eslint'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': airbnbNoExtraDepsRule,
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'func-names': 'off',
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    camelcase: ['error', { ignoreImports: true }],
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
      },
    ],
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
      },
    ],
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
  },
  // ignorePatterns: ['*.d.ts', '*.generated.ts'],
};
