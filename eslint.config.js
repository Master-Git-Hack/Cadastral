import oxlint from 'eslint-plugin-oxlint';
export default [
  ...// other plugins
  oxlint.configs['flat/recommended'], // oxlint should be the last one
];