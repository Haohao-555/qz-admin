<template>
  <div class="side">
    <div class="logo-container">
      <el-avatar
        :size="logoHeight"
        shape="square"
        :src="require('@/assets/' + config.logoUrl.replace('@/assets/', ''))"
      ></el-avatar>
      <h1 class="logo-title" v-if="!collapse">
        {{ config.project }}
      </h1>
    </div>
    <el-scrollbar>
      <sidebar-menu :collapse="collapse"></sidebar-menu>
    </el-scrollbar>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
import SidebarMenu from './SidebarMenu'
import config from '@/setting'
const logoHeight = 30
defineProps({
  collapse: {
    type: Boolean,
    default: false,
    validator: function (value) {
      return [true, false].indexOf(value) !== -1
    }
  }
})
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
