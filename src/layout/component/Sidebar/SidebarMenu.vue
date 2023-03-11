<template>
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :default-active="activeMenu"
    background-color="#000"
    text-color="#bfcbd9"
    :active-text-color="$store.getters.mainColor"
    :unique-opened="true"
    router
  >
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>
<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { filtersRoutes, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem'
// 该项目下路由信息
const router = useRouter()
// 当前路由信息
const route = useRoute()

// 生成新的
const routes = computed(() => {
  const fRoutes = filtersRoutes(router.getRoutes())
  return generateMenus(fRoutes)
})

// 计算高亮 menu
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
</script>
<style lang="scss" scoped>
</style>
