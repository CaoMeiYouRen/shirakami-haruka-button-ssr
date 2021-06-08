<template>
    <v-app>
        <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            :duration="{enter: 500, leave: 500}"
            mode="out-in"
        >
            <keep-alive>
                <div class="Home">
                    <!-- 侧边栏 -->
                    <v-navigation-drawer
                        v-model="drawer"
                        fixed
                        app
                        disable-resize-watcher
                        must-sort
                    >
                        <v-list dense>
                            <div v-for="(item,index) in menuList" :key="item.name">
                                <v-list-item :title="item.url || item.path" @click="item.fun? item.fun() : $router.push(item.path)">
                                    <v-list-item-action>
                                        <v-icon :color="item.color || 'primary'">
                                            {{ item.icon }}
                                        </v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-divider v-if="index<menuList.length-1" />
                            </div>
                        </v-list>
                    </v-navigation-drawer>
                    <!-- 顶部导航栏 -->
                    <v-app-bar
                        app
                        color="primary"
                        dense
                        dark
                        flat
                        class="haruka-app-bar-boxshadow"
                    >
                        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
                        <v-toolbar-title class="align-center mr-5">
                            <span class="title">{{ title }}</span>
                        </v-toolbar-title>
                        <v-spacer />
                        <v-tooltip bottom>
                            <template #activator="{on: tooltip}">
                                <v-btn
                                    icon
                                    class="white--text"
                                    :href="GITHUB_LINK"
                                    target="_blank"
                                    v-on="{...tooltip}"
                                >
                                    <v-icon size="28">
                                        iconfont icon-github2
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span>{{ $t('ProjectAddress') }}</span>
                        </v-tooltip>
                        <v-menu offset-y>
                            <template #activator="{on: menu}">
                                <v-tooltip left>
                                    <template #activator="{on: tooltip}">
                                        <v-btn
                                            icon
                                            class="white--text"
                                            v-on="{...tooltip, ...menu}"
                                        >
                                            <v-icon>translate</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>{{ $t('appBar.SwitchLanguage') }}</span>
                                </v-tooltip>
                            </template>
                            <v-list>
                                <v-list-item
                                    v-for="item in langList"
                                    :key="item.lang"
                                    @click="switchLang(item.lang)"
                                >
                                    <v-list-item-title>{{ item.label }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-app-bar>
                    <!-- 主体 -->
                    <v-main class="main">
                        <transition
                            enter-active-class="animated fadeIn"
                            leave-active-class="animated fadeOut"
                            :duration="{enter: 500,leave: 500}"
                            mode="out-in"
                        >
                            <keep-alive>
                                <nuxt />
                            </keep-alive>
                        </transition>
                        <v-tooltip top>
                            <template #activator="{on}">
                                <v-fab-transition>
                                    <v-btn
                                        v-show="isShowBackTop"
                                        color="primary"
                                        dark
                                        fixed
                                        bottom
                                        right
                                        fab
                                        v-on="on"
                                        @click="backTop"
                                    >
                                        <v-icon>mdi-chevron-up</v-icon>
                                    </v-btn>
                                </v-fab-transition>
                            </template>
                            <span>{{ $t('BackToTop') }}</span>
                        </v-tooltip>
                    </v-main>
                </div>
            </keep-alive>
        </transition>
        <CopyrightFooter />
    </v-app>
</template>

<script lang="ts">
import { useOnWindowResize } from '@/composable'
import { NODE_ENV, BASE_URL, BILI_UID, CDN_PATH, GITHUB_LINK } from '@/config/env'
import { messages } from '@/locales'
import { computed, defineComponent, onUnmounted } from '@vue/composition-api'
import { useOnScroll, useTitle } from 'vue-composable'
import { safeOpenUrl } from '@/utils/helper'

const langList: { lang: string, label: string }[] = Object.keys(messages).map((e) => ({
    lang: e,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    label: messages[e].langName,
}))

export default defineComponent({
    name: 'Default',
    props: {},
    setup(props, ctx) {
        const title = useTitle()
        const { scrollTop, remove } = useOnScroll()
        const { height } = useOnWindowResize()
        const isShowBackTop = computed(() => scrollTop.value >= (height.value / 3 || 300))

        onUnmounted(() => {
            remove()
        })
        return {
            GITHUB_LINK,
            title,
            isShowBackTop,
            drawer: true,
            langList,

            scrollTop,
        }
    },
    computed: {
        menuList(): any {
            return [
                {
                    icon: 'home',
                    name: this.$t('menu.Home'),
                    path: '/',
                },
                {
                    icon: 'iconfont icon-bilibili2',
                    name: this.$t('menu.Bilibili'),
                    url: `https://space.bilibili.com/${BILI_UID}`,
                    fun() {
                        safeOpenUrl(this.url)
                    },
                },
                {
                    icon: 'iconfont icon-changelog-clock',
                    name: this.$t('menu.Changelog'),
                    path: '/changelog',
                },
                {
                    icon: 'code',
                    name: this.$t('menu.About'),
                    path: '/about',
                },
                {
                    icon: 'mdi-download',
                    name: this.$t('menu.Download'),
                    url: `${NODE_ENV === 'production' ? CDN_PATH : ''}${BASE_URL}voices.zip`,
                    fun() {
                        safeOpenUrl(this.url)
                    },
                },
            ] as const
        },
    },
    watch: {
        $route(): void {
            if (this.scrollTop > 50) {
                this.backTop()
            }
        },
        '$i18n.locale'(): void {
            document.title = this.$t('title') as string
        },
    },
    methods: {
        switchLang(locale: string): void {
            this.$i18n.locale = locale
        },
        backTop(): void {
            this.$vuetify.goTo(0, {
                duration: 500,
            })
        },
    },
})
</script>

<style lang="scss" scoped>
</style>