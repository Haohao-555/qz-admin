<template>
  <div class="app-wrapper" :class="[$store.getters.sidebarOpened ? 'openSidebar' :'hideSidebar']">
    <!-- 左侧导航 -->
    <sidebar id="guide-sidebar" class="sidebar-container"></sidebar>
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <navbar />
      </div>
       <!-- 内容区 -->
       <app-main />
    </div>
  </div>
</template>
<script setup>
import AppMain from './component/AppMain'
import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'

import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { filtersRoutes, generateMenus } from '@/utils/route'

const router = useRouter()

const routes = computed(() => {
  const fRoutes = filtersRoutes(router.getRoutes())
  return generateMenus(fRoutes)
})

console.log(routes.value)
</script>
<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sidebarDuration};
}
.hideSidebar .fixed-header {
   width: calc(100% - #{$hideSideBarWidth})
}
</style>
