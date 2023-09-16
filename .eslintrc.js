module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'airbnb-base',
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json'
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  globals: {
    DocumentReadyState: true,
    defineProps: true,
    defineEmits: true,
    defineExpose: true
  },
  ignorePatterns: ['dist-electron', 'node_modules'],
  settings: {},
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    // 开放入参修改值
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'e', // for e.returnvalue
          'ctx', // for Koa routing
          'req', // for Express requests
          'request', // for Express requests
          'res', // for Express responses
          'response' // for Express responses
        ]
      }
    ],
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true
      }
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index']
      }
    ]
  }
}
