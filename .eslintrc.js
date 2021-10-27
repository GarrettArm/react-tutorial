module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    browser: true
  },
  parser: 'babel-eslint',
  extends: [
    'standard',
    'standard-jsx',
    'standard-react',
    'react-app/jest'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'no-var': 'warn',
    'no-console': 'warn'
  }

}
