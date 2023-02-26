<template>
  <div class="">
    <div class="logo-container">
      <el-avatar :size="logoHeight" shape="square" :src="backgroundImgUrl"></el-avatar>
      <h1 class="logo-title">HM-ADMIN</h1>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>
<script setup>
import SidebarMenu from './SidebarMenu'
const backgroundImgUrl = require('@/assets/logo.png')
const logoHeight = 30
</script>
<style lang="scss" scoped>
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
</style>
