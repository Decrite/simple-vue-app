/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')
const path = require('path')

module.exports = {
  root: true,
  extends: [
    'airbnb',
    'prettier',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  parserOptions: {
    babelOptions: {
      rootMode: 'upward'
    }
  },
  env: {
    browser: true,
    jest: true
  },
  globals: {
    ENV: 'readonly'
  },
  plugins: ['vuejs', 'simple-import-sort', '@tanstack/query'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
      },
      typescript: {}
    }
  },
  rules: {
    'prefer-object-spread': 'off',
    'default-param-last': 'off',
    'no-restricted-exports': 'off',
    'no-promise-executor-return': 'off',
    'max-classes-per-file': 'off',

    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: false }],
    'import/first': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        vue: 'never'
      }
    ],
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // see: https://github.com/lydell/eslint-plugin-simple-import-sort/blob/main/examples/.eslintrc.js
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.s?css$']
        ]
      }
    ],
    'simple-import-sort/exports': 'error'
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: [path.resolve(__dirname, 'tsconfig.json'), 'tsconfig.json']
      },
      extends: [
        'airbnb-typescript',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
      ],
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/default-param-last': 'off',
        '@typescript-eslint/no-var-requires': 'warn',

        // Note: you must disable the base rule as it can report incorrect errors (https://typescript-eslint.io/rules/no-unused-vars/)
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',

        // Note: you must disable the base rule as it can report incorrect errors (https://typescript-eslint.io/rules/no-use-before-define/)
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'error'
      }
    },
    {
      files: [
        '*.js',
        'bin/*.js',
        '**/__tests__/**/*.{js,jsx,ts,tsx,vue}',
        '**/demo/**/*.{js,jsx,ts,tsx,vue}',
        '*.vue'
      ],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true, packageDir: __dirname }
        ]
      }
    }
  ]
}
