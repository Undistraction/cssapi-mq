module.exports = {
  extends: [
    'eslint-config-airbnb-base',
    'prettier',
    'plugin:ramda/recommended',
  ],
  plugins: ['prettier', 'eslint-plugin-ramda'],
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
  rules: {
    'func-names': ['error', 'never'],
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-confusing-arrow': 'off',
    'no-unused-expressions': [
      'error',
      {
        allowTaggedTemplates: true,
      },
    ],
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
    'no-console': ['error'],
    'ramda/always-simplification': ['error'],
    'ramda/compose-simplification': ['error'],
    'ramda/eq-by-simplification': ['error'],
    'ramda/prefer-complement': ['error'],
  },
}
