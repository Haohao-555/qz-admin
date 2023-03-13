<template>
  <el-card class="home-view">
    <div :class="$store.getters.isMobile? 'mobile' : ''"></div>
  </el-card>
</template>
<script setup></script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.home-view {
  height: calc(100vh - #{$headerHeight} - #{$tagViewHeight} - #{$footerHeight} - 20px);
  background-image: url('~@/assets/welcome.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 6px;
}
.mobile {
  background-size: contain;
}
</style>
