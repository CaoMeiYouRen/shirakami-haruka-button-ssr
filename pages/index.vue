<template>
    <v-row justify="center" align="center">
        <v-col
            cols="12"
            sm="8"
            md="6"
        >
            <v-card>
                <v-card-title class="headline">
                    {{ title }}
                </v-card-title>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
    name: 'Index',
    setup(props) {
        return {
            title: 'Welcome to the Vuetify + Nuxt.js template',
        }
    },
    async asyncData({ $axios }: any) {
        // const post = await $axios.$get('')
        // return { post }
    },
})
</script>