<template>
  <!-- <el-alert :title="$t('msg.auth.btn')" type="success" :effect="$store.getters.isDark ? 'dark' : 'light'" :closable="false" />
  <el-button type="success" plain>当前身份: {{ $store.getters.userInfo.authId === '1' ? '管理员' : '普通用户' }}</el-button>
  <div class="options">
    <el-button type="info" v-auth="['export']">导出用户列表</el-button>
    <el-button type="danger" v-auth="['delete']">删除用户</el-button>
    <el-button type="warning" v-auth="['change']">修改用户权限</el-button>
  </div> -->
  <el-button type="primary" round >切换身份</el-button>
</template>
<script setup></script>
<style lang="scss" scoped>
.options .el-button {
  display: inline-block;
}
.el-button {
  display: block;
  margin: 20px;
}
</style>
