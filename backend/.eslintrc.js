module.exports = {
  // env: {
  //  // browser: true,
  //   es2021: true,
  // },
  // extends: 'airbnb-base',
  // overrides: [
  //   {
  //     env: {
  //       node: true,
  //     },
  //     files: ['.eslintrc.{js,cjs}'],
  //     parserOptions: {
  //       sourceType: 'script',
  //     },
  //   },
  // ],
  // parserOptions: {
  //   ecmaVersion: 'latest',
  //   sourceType: 'module',
  // },
  extends: 'airbnb-base',
  rules: {
    quotes: [
      'error',
      'single',
    ],
    'no-underscore-dangle': [{'allow': ["_id"]}],
  },
};
