<template>
  <!-- <el-alert :title="$t('msg.auth.page')" type="success" :effect="$store.getters.isDark ? 'dark' : 'light'" :closable="false" />
  <el-button type="success" plain>当前身份: {{ $store.getters.userInfo.authId === '1' ? '管理员' : '普通用户' }}</el-button>
  <el-alert :title="$t('msg.auth.switchPageAuth')" type="warning" :effect="$store.getters.isDark ? 'dark' : 'light'" :closable="false" /> -->
  <el-button type="danger" round >切换身份</el-button>
</template>
<script setup></script>
<style lang="scss" scoped>
.el-button {
  margin: 20px;
}
</style>
