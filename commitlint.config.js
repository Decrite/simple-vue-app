module.exports = {
  commitlint: {
    extends: ['@commitlint/config-conventional']
  },
  rules: {
    //   'subject-case': [2, 'never', ['start-case', 'pascal-case']],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test']
    ]
  }
}
