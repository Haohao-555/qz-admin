<template>
  <div class="private-view">
    <div class="container">
      <div class="data-component">
       <data-component></data-component>
      </div>
      <!-- <el-row :gutter="10">
        <el-col :md="18" :lg="18" :xs="24" :sm="24" class="main">
          <el-card></el-card>
        </el-col>
        <el-col :md="6" :lg="6" :xs="24" :sm="24" class="nav">
          <el-card></el-card>
        </el-col>
      </el-row> -->
    </div>
  </div>
</template>
<script setup>
import DataComponent from './component/DataComponet'
</script>
<style lang="scss" scoped>
.private-view {
  .container {
    .data-component {
      min-width: 1200px;
      margin: auto;
    }
    .main {
      margin-bottom: 10px;
    }
    .nav {
    }
  }
}
</style>
