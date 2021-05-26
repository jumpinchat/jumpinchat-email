module.exports = {
  extends: 'airbnb-base',
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 10
  },
  rules: {
    // formatting
    indent: ['error', 2, {'SwitchCase': 1}],
  },
  overrides: [
    {
      files: ['**/*.spec.js'],
      env: {
        node: true,
        mocha: true,
      },
    }
  ]
};
