import i18nOption from './plugins/i18n-option'
export default {
    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s',
        title: '豹按钮 (:3っ)∋',
        htmlAttrs: {
            lang: 'zh-CN',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ],
        script: [
            // { src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js', async: true, defer: true }
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/composition-api',
        '@/plugins/i18n',
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/stylelint
        '@nuxtjs/stylelint-module',
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        [
            'nuxt-i18n',
            {
                locale: 'zh',
                defaultLocale: 'zh',
                vueI18n: i18nOption,
            },
        ],
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        // customVariables: ['~/style/index.scss'],
        theme: {
            dark: false,
            themes: {
                light: {
                    primary: '#ffaea6',
                },
            },
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    },

    alias: {
        '@/composable': '<rootDir>/composable',
        '~~': '<rootDir>',
        '@@': '<rootDir>',
        '~': '<srcDir>',
        '@': '<srcDir>',
        assets: '<srcDir>/assets', // (unless you have set a custom `dir.assets`)
        static: '<srcDir>/static', // (unless you have set a custom `dir.static`)
    },
}