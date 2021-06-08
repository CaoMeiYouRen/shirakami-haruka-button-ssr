const IS_PROD = process.env.NODE_ENV === 'production' ? 2 : 0

module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        '@nuxtjs/eslint-config-typescript',
        'plugin:nuxt/recommended',
        'cmyr/vue',
    ],
    plugins: [
        'vue',
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: new Date().getFullYear(),
        sourceType: 'module',
        ecmaFeatures: {
            modules: true,
        },
    },
    parser: 'vue-eslint-parser',
    rules: {
        'vue/match-component-file-name': [1, { // 要求组件名称属性与其文件名匹配
            extensions: ['jsx', 'tsx', 'vue'],
            shouldMatchCase: false,
        }],
        'vue/no-reserved-component-names': [2], // 不允许在组件定义中使用保留名称
        'vue/require-name-property': [0], // 组件必须命名
        'vue/block-tag-newline': 0,
        'vue/jsx-uses-vars': [1],
        'vue/no-unused-vars': [1],
        'no-unused-vars': [0],
        'eol-last': [IS_PROD, 'never'], // 禁止文件末尾存在空行
    },
}