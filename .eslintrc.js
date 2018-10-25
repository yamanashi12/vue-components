module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    // '@vue/prettier'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['error', 'never'],
    'no-multiple-empty-lines': ['error']
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}

// module.exports = {
//   root: true,
//   env: {
//     node: true,
//   },
//   extends: ['plugin:vue/essential', '@vue/prettier'],
//   rules: {
//     'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//     'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//     quotes: ['error', 'single'],
//     'prettier/prettier': [
//       '0',
//       {
//         useTabs: false,
//         eslintIntegration: true,
//         printWidth: 120,
//         semi: false,
//         'trailing-comma': 'none',
//         'prose-wrap': false,
//         singleQuote: true,
//       },
//     ],
//     indent: ['error', 2],
//     'no-multiple-empty-lines': 0,
//     semi: ['error', 'never'],
//   },
//   parserOptions: {
//     parser: 'babel-eslint',
//   },
// };