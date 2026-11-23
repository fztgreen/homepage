// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettier = require('eslint-config-prettier/flat');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case'
        }
      ],
      eqeqeq: ['error', 'always'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['classProperty', 'parameterProperty'],
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'require'
        },
        {
          selector: 'classMethod',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'forbid'
        }
      ]
    }
  },
  {
    files: ['**/*.html'],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility
    ],
    rules: {}
  },
  {
    files: ['**/*.spec.ts'],
    rules: {
      'no-restricted-globals': [
        'error',
        {
          name: 'fdescribe',
          message: 'A focused spec silently skips every other test.'
        },
        {
          name: 'fit',
          message: 'A focused spec silently skips every other test.'
        },
        { name: 'xdescribe', message: 'Fix or delete the skipped spec.' },
        { name: 'xit', message: 'Fix or delete the skipped spec.' }
      ]
    }
  },
  // Turns off every stylistic rule that Prettier owns, so the two never disagree.
  prettier,
  {
    // After eslint-config-prettier, which disables curly. With "all", Prettier never conflicts with it.
    files: ['**/*.ts'],
    rules: {
      curly: ['error', 'all']
    }
  }
]);
