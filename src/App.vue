<template>
  <router-view />
</template>

<script setup>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()

watch(
  () => router.currentRoute.value,
  () => {
    if (store.getters.isMobile) {
      store.commit('app/changeSidebarOpened', false)
    }
  },
  { immediate: true }
)
</script>

<style></style>
