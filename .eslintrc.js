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
  plugins: ['react', 'react-hooks'],
  rules: {
    'no-var': 'warn',
    'no-console': 'warn',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn' // Checks effect dependencies
  }
}
