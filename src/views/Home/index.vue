<template>
  <div class="home-view">
    <el-row :gutter="20" class="container">
      <el-col :span="24">
        <el-card>
          <div style="height: 120px"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="container">
      <el-col :span="6">
        <el-card>
          <div style="height: 300px"></div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <div style="height: 300px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.container {
  margin-bottom: 20px;
}
</style>
