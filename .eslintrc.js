module.exports = {
  extends: require.resolve('@umijs/lint/dist/config/eslint'),
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
  },
};
