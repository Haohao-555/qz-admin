<template>
  <el-menu
    :collapse="collapse"
    :default-active="activeMenu"
    text-color="#bfcbd9"
    :background-color="ASIDE_COLOR"
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
import { computed, defineProps, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { filtersRoutes, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem'
import config from '@/setting'
import { ASIDE_COLOR } from '@/constant'
// 该项目下路由信息
const router = useRouter()
// 当前路由信息
const route = useRoute()
// store 实例
const store = useStore()
defineProps({
  collapse: {
    type: Boolean,
    default: false,
    validator: function (value) {
      return [true, false].indexOf(value) !== -1
    }
  }
})

// 生成新的路由
const routes = computed(() => {
  const fRoutes = filtersRoutes(router.getRoutes())
  const menuList = generateMenus(fRoutes)
  const sortMenuList = []
  if (config.routeSort) {
    config.routeSort.forEach((route) => {
      const i = menuList.findIndex((menuItem) => menuItem.path === route)
      if (i !== -1) {
        sortMenuList.push(menuList[i])
        menuList.splice(i, 1)
      }
    })
  }
  return sortMenuList.concat(menuList)
})

// 计算高亮 menu
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

onUnmounted(() => store.commit('app/changeSidebarOpened', false))
</script>
<style lang="scss" scoped></style>
