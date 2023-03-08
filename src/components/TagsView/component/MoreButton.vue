<template>
  <el-dropdown trigger="click" :teleported="false">
    <el-button size="small" type="primary">
      <span style="padding-right: 6px">更多</span>
      <el-icon><ArrowDown /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="refresh">
          <el-icon><Refresh /></el-icon>刷新
        </el-dropdown-item>
        <el-dropdown-item @click="maximize">
          <el-icon><FullScreen /></el-icon>最大化
        </el-dropdown-item>
        <el-dropdown-item @click="closeCurrentTab">
          <el-icon><Remove /></el-icon>关闭当前
        </el-dropdown-item>
        <el-dropdown-item @click="closeOtherTab">
          <el-icon><CircleClose /></el-icon>关闭其他
        </el-dropdown-item>
        <el-dropdown-item @click="closeAllTab">
          <el-icon><FolderDelete /></el-icon>关闭所有
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import {
  Refresh,
  FullScreen,
  Remove,
  CircleClose,
  FolderDelete,
  ArrowDown
} from '@element-plus/icons-vue'
// 刷新
const refresh = () => {
  console.log('刷新')
}

// 最大化
const maximize = () => {
  console.log('最大化')
}

// 关闭当前
const closeCurrentTab = () => {
  console.log('关闭当前')
}

// 关闭其他
const closeOtherTab = () => {
  console.log('关闭其他')
}

// 关闭所有
const closeAllTab = () => {
  console.log('关闭所有')
}
</script>
<style lang="scss" scoped>
</style>
