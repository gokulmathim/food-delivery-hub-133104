const js = require('@eslint/js');
const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const eslintConfigPrettier = require('eslint-config-prettier');

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
  // Ignore build artifacts, dependencies, and internal tooling folders.
  {
    ignores: ['dist/**', 'node_modules/**', '.knowledge/**'],
  },

  // Ensure this config file itself is linted with Node globals available.
  // (ESLint will lint eslint.config.js unless ignored; this avoids no-undef on require/module.)
  {
    files: ['eslint.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  js.configs.recommended,

  // TypeScript rules
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'script',
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },

  // Turn off rules that conflict with Prettier formatting
  eslintConfigPrettier,
];
