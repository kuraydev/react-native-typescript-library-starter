import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['lib/**', 'node_modules/**', 'scripts/**', 'babel.config.js'] },
  tseslint.configs.recommended,
  react.configs.flat.recommended,
  reactHooks.configs.flat.recommended,
  eslintConfigPrettier,
  eslintPluginPrettier,
  {
    settings: { react: { version: 'detect' } },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
);
