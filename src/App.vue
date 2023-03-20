<template>
  <el-config-provider :locale="$store.getters.language === 'en' ? en : zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useTheme } from '@/hook/useTheme'
import { useIsMobile } from '@/hook/useIsMobile'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import i18n from '@/i18n'
const router = useRouter()
const store = useStore()
const { initTheme } = useTheme()
// 避免刷新情况下，国际化无法匹配
i18n.global.locale.value = store.getters.language
// 监听屏幕是 移动端 或 PC端
useIsMobile()
// 初始化主题色
initTheme()

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
<style lang="scss"></style>
