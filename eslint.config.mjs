import baseConfig from '@appium/eslint-config-appium-ts';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      // Add any project-specific rules here
    },
  },
];
