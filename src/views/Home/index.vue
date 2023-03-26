<template>
  <el-card class="home-view view-main-height">
    <div :class="$store.getters.isMobile? 'mobile' : ''"></div>
  </el-card>
</template>
<script setup></script>
<style lang="scss" scoped>
.home-view {
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
