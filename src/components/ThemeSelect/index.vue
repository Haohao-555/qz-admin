<template>
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme"
  >
    <!-- 图标 -->
    <div>
      <svg-icon id="guide-theme" icon="change-theme"></svg-icon>
    </div>
    <!-- menu -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color"> 修改主题 </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 弹出层 -->
  <div>
    <select-color v-model="selectColorVisible"></select-color>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import SelectColor from './components/SelectColor'
const selectColorVisible = ref(false)
const handleSetTheme = () => {
  selectColorVisible.value = true
}
</script>
<style lang="scss" scoped></style>
