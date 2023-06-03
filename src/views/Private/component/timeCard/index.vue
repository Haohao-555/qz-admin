<template>
  <el-card>
    <div class="">
      <span>今天已经过去  21  个小时</span>
      <el-progress :percentage="50" :indeterminate="true" />
    </div>
    <div class="">
      <span>这周已经过去  6  天</span>
      <el-progress :percentage="50" :indeterminate="true" />
    </div>
    <div class="">
      <span>本月已经过去  3  天</span>
      <el-progress :percentage="50" :indeterminate="true" />
    </div>
    <div class="">
      <span>本年已经过去  6  个月</span>
      <el-progress :percentage="50" :indeterminate="true" />
    </div>
  </el-card>
</template>
<script setup>
</script>
<style lang="scss" scoped>
</style>
