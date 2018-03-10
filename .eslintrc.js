module.exports = {
  extends: [
    'eslint-config-airbnb-base',
    'prettier',
    'plugin:react/recommended',
    'plugin:ramda/recommended',
  ],
  plugins: ['prettier', 'react', 'ramda', 'styled-components-config'],
  env: {
    browser: true,
    jest: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    l: true,
  },
  rules: {
    'func-names': ['error', 'never'],
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-confusing-arrow': 'off',
    quotes: [
      'error',
      'backtick',
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
    'jsx-quotes': ['error', 'prefer-double'],
    'comma-dangle': ['error', 'always-multiline'],
    'valid-jsdoc': ['error'],
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    'import/extensions': ['off', 'never'],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_$',
      },
    ],
    'react/jsx-uses-vars': ['error'],
  },
};
