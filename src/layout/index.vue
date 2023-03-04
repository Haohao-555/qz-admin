<template>
  <div
    class="app-wrapper"
    :class="[
      { openSidebar: store.getters.sidebarOpened },
      { hideSidebar: !store.getters.sidebarOpened },
      { siderFixed: store.getters.sidebarOpened && store.getters.isMobile }
    ]"
  >
    <!-- 左侧导航 -->
    <sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVar.menuBg }"
    />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <navbar />
      </div>
      <!-- 内容区 -->
      <app-main />
    </div>
    <div class="mask" v-if="showMask" @click="closeAside"></div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useIsMobile } from '@/hook/useIsMobile'
import AppMain from './component/AppMain'
import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'

useIsMobile()

const store = useStore()
// 计算是否展开侧栏
const showMask = computed(() => {
  const sidebarOpened = store.getters.sidebarOpened
  const isMobile = store.getters.isMobile
  return sidebarOpened && isMobile
})

// 关闭侧栏
const closeAside = () => store.commit('app/changeSidebarOpened', false)
</script>
<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;

  .mask {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: rgba($color: #000, $alpha: 0.1);
    z-index: 200;
  }
}
.siderFixed {
  .sidebar-container {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
  }
  .main-container {
    margin-left: 0px !important;
    .fixed-header {
      width: 100% !important;
    }
  }
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
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
