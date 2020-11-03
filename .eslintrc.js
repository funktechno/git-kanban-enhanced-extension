module.exports = {
  root: true,
  env: {
    node: true,
    webextensions: true,
    browser: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/typescript/recommended', '@vue/prettier', '@vue/prettier/@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'cProduction' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'cProduction' ? 'warn' : 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowedNames: ['self', 'vm'], // Allow `const self = this`; `[]` by default
      },
    ],
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
