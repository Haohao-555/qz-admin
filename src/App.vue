<template>
  <el-config-provider :locale="$store.getters.language === 'en' ? en : zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
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
<style lang="scss" scoped></style>
