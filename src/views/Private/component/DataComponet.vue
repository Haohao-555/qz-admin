<template>
  <div class="data-component-view">
    <div class="container">
      <el-card class="data-item">
        <div class="item-container"></div>
      </el-card>
      <el-card class="data-item"></el-card>
      <el-card class="data-item"></el-card>
      <el-card class="data-item"></el-card>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.data-component-view {
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-card {
      margin: 20px 26px;
    }
    .data-item {
      flex: 1;
      height: 140px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item-container {}
    }
  }
}
</style>
