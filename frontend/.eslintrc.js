module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ['@typescript-eslint', 'no-loops', 'prettier'],
  extends: [
    'plugin:vue/essential',
    'plugin:prettier/recommended',
    '@vue/airbnb',
    '@vue/typescript/recommended',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-loops/no-loops': 2,
    'import/no-unresolved': 'off',
    'class-methods-use-this': 'off',
    'no-console': 1,
    'no-debugger': 1,
    'object-curly-newline': 'off',
    'comma-dangle': 'off',
    'import/extensions': 'off',
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
