module.exports = {
  customSyntax: 'postcss-scss',
  extends: ['stylelint-config-recommended', 'stylelint-config-css-modules'],
  plugins: ['stylelint-scss'],
  rules: {
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen']
      }
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          'colorDefault',
          'colorInfo',
          'colorSuccess',
          'colorWarning',
          'colorError'
        ]
      }
    ]
  }
}
