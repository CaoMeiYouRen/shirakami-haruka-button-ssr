<template>
    <v-app>
        <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            :duration="{enter: 500, leave: 500}"
            mode="out-in"
        >
            <nuxt />
        </transition>
        <CopyrightFooter />
    </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
    name: 'Default',
})
</script>