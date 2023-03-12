<template>
  <div class="app-wrapper" :class="store.getters.sidebarOpened ? '' : 'hideSidebar'">
    <!-- PC端侧栏 -->
    <sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :collapse="!store.getters.sidebarOpened"
    />
    <!-- 移动端侧栏抽屉 -->
    <el-drawer
      v-model="openDrawer"
      direction="ltr"
      :show-close="false"
      :size="sideBarWidth"
      :destroy-on-close="true"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <sidebar
        class="sidebar-container drawer-sidebar"
        :collapse="!store.getters.drawerSidebarOpened"
      />
    </el-drawer>
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <navbar />
      </div>
      <tags-view id="guide-tags"></tags-view>
      <!-- 内容区 -->
      <app-main />
      <div class="fiexd-footer">
        <!-- 底部条 -->
        <nav-footer />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useIsMobile } from '@/hook/useIsMobile'
import AppMain from './component/AppMain'
import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import NavFooter from './component/NavFooter'
import TagsView from './component/TagsView'
const store = useStore()
useIsMobile()

// 是否显示 移动端 的侧栏
const openDrawer = computed(() => {
  // ! v-model 为双向数据绑定（不能直接将 store 直接绑定到 v-model）
  return store.getters.drawerSidebarOpened
})

// 计算抽屉的宽度
const sideBarWidth = computed(() => {
  if (store.getters.drawerSidebarOpened) {
    return store.getters.cssVar.sideBarWidth
  }
  return 0
})
</script>
<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;

  // 侧栏展开
  .sidebar-container {
    transition: width #{$sidebarDuration};
    width: $sideBarWidth;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
  }
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width #{$sidebarDuration};
  }
  .main-container {
    min-height: 100%;
    margin-left: $sideBarWidth;
    transition: margin-left #{$sidebarDuration};
    position: relative;
    background-color: #f0f2f5;
    .fiexd-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      z-index: 200;
    }
  }

  // 侧栏隐藏
  &.hideSidebar {
    .sidebar-container {
      width: $hideSideBarWidth;
    }
    .fixed-header {
      width: calc(100% - #{$hideSideBarWidth});
    }
    .main-container {
      margin-left: $hideSideBarWidth;
    }
  }

  // 抽屉侧栏（展开）
  .sidebar-container.drawer-sidebar {
    width: $sideBarWidth;
  }
}
</style>
