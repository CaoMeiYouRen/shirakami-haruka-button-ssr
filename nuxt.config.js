import FileManagerPlugin from 'filemanager-webpack-plugin'
import i18nOption from './plugins/i18n-option'
const env = process.env
const __DEV__ = env.NODE_ENV === 'development'
const __PROD__ = !__DEV__

export default {
    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',
    server: {
        port: 7000, // default: 3000
    },
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
            // { ref: 'stylesheet', type: 'text/css', href: 'https://at.alicdn.com/t/font_2115084_em9y98irv1s.css' },
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ],
        script: [
            { src: `https://hm.baidu.com/hm.js?${process.env.VUE_APP_BAIDU_STATISTICS}` },
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        'normalize.css',
        'animate.css',
        'material-design-icons-iconfont/dist/material-design-icons.css',
        '@mdi/font/css/materialdesignicons.css',
        '@/styles/index.scss',
        '@/styles/iconfont.css',
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
        ['@nuxtjs/dotenv', {}],
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
                locales: [
                    {
                        code: 'zh',
                        name: 'Chinese',
                    },
                    {
                        code: 'en',
                        name: 'English',
                    },
                    {
                        code: 'jp',
                        name: 'Japanese',
                    },
                ],
                vueI18n: i18nOption,
            },
        ],
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        proxy: true, // 表示开启代理
        // credentials: true, // 表示跨域请求时是否需要使用凭证
    },
    proxy: {
        '/rss': {
            target: 'https://rsshub.cmyr.ltd/',
            ws: true,
            changOrigin: true,
            pathRewrite: {
                '^/rss': '/',
            },
        },
    },
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
        extend(config, context) {
            config.module.rules.push({
                test: /\.md$/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                    {
                        loader: 'markdown-it-loader',
                        options: {
                            html: true,
                        },
                    },
                ],
            })

            if (__PROD__) {
                config.plugins.push(
                    new FileManagerPlugin({
                        events: {
                            onEnd: {
                                delete: [
                                    './static/voices.zip',
                                    './dist/voices.zip',
                                ],
                                archive: [
                                    { source: './static/voices', destination: './static/voices.zip' },
                                ],
                            },
                        },
                    }),
                )
            }
        },
    },
}