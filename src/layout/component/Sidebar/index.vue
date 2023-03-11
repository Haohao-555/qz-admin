<template>
  <div class="side">
    <div class="logo-container">
      <el-avatar
        :size="logoHeight"
        shape="square"
        :src="require('@/assets/' + config.logoUrl.replace('@/assets/', ''))"
      ></el-avatar>
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">
        {{ config.project }}
      </h1>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>
<script setup>
import SidebarMenu from './SidebarMenu'
import config from '@/setting'
const logoHeight = 30
</script>
<style lang="scss" scoped>
.side {
  background-color: #000000;
  .logo-container {
    height: v-bind(logoHeight) + 'px';
    padding: 10px 0 22px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .logo-title {
      margin-left: 10px;
      color: #fff;
      line-height: 50px;
      font-weight: 600;
      font-size: 18px;
      white-space: nowrap;
    }
  }
}
</style>
