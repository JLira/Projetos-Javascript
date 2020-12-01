module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: ['airbnb-base','prettier'],
    plugins:['prettier'],
    globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier":"error",
    "class-methods-use-this":"off",
    "no-param-reassign":"off",
    "camelcase":"off",
    "linebreak-style": 0,
    "global-require": 0,
    "eslint linebreak-style": [0, "error", "windows"],
    "no-unused-vars":["error", {"argsIgnorePattern": "next"}]
  }
};
