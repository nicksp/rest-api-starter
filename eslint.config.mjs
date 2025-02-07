import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  formatters: true,
  ignores: ['**/migrations'],
}, { rules: {
  'no-console': ['warn'],
  'prefer-arrow-callback': ['error'],
  'prefer-template': ['error'],
  'antfu/no-top-level-await': ['off'],
  'node/prefer-global/process': ['off'],
  'node/no-process-env': ['error'],
  'perfectionist/sort-imports': ['error', {
    tsconfigRootDir: '.',
    internalPattern: ['^@/.*'],
  }],
  'unicorn/filename-case': ['error', {
    case: 'kebabCase',
    ignore: ['README.md'],
  }],
  'vitest/prefer-lowercase-title': ['error', {
    ignore: ['describe'],
  }],
} })
