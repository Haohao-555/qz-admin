<template>
  <div class="home-view"></div>
</template>
<script setup></script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.home-view {
  height: calc(100vh - #{$headerHeight} - #{$tagViewHeight} - #{$footerHeight} - 20px);
  background-image: url('~@/assets/welcome.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  border-radius: 6px;
  background-color: #fff;
}
</style>
