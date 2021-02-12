<template>
    <v-card
        flat
        rounded="xl"
        class="haruka-card"
    >
        <v-card-title v-if="title" primary-title>
            {{ title }}
        </v-card-title>
        <v-card-text>
            <slot />
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    name: 'HarukaCard',
    props: {
        tag: {
            type: String,
            default: '',
        },
        rawTitle: {
            type: String,
            default: '',
        },
    },
    computed: {
        title(): string {
            const tag = this.tag
            const rawTitle = this.rawTitle
            if (rawTitle) {
                return rawTitle
            }
            if (!tag) {
                return ''
            }
            return this.$t(`tags.${tag}`) as string
        },
    },
})
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';

.haruka-card {
    box-shadow: 1px 5px 22px rgb(255, 174, 166, 0.6) !important;
}
</style>