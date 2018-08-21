module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb-base',
  env: {
    browser: true,
    node: true,
    // es6: true,
  },
  globals: {
    hyperapp: true,
  },
  plugins: ['react'],
  rules: {
    'max-len': [
      'error', {
        code: 80,
      }
    ],
    'semi': 0,
    'no-unused-vars': ['error', {
    //   vars: 'all',
    //   args: 'after-used',
    //   ignoreRestSiblings: false,
      varsIgnorePattern: '^h$'
    }],
    'no-underscore-dangle': 0,
    'no-nested-ternary': 0,
    'react/jsx-uses-vars': 'error',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  }
};