<template>
  <el-scrollbar class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path"></component>
        </keep-alive>
      </transition>
    </router-view>
  </el-scrollbar>
</template>
<script setup></script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.app-main {
  height: calc(100vh - #{$headerHeight} - #{$tagViewHeight} - #{$footerHeight});
  width: 100%;
  position: relative;
  box-sizing: border-box;
  padding: 10px;
}
</style>
