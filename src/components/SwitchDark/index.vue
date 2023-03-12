<template>
  <el-switch
    v-model="isDark"
    @change="toggle"
    inline-prompt
    :active-icon="Sunny"
    :inactive-icon="Moon"
    class="switch"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useToggle } from '@vueuse/shared'
import { useDark } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { DARK } from '@/constant'

const isDark = ref(false)

const switchDark = useDark({
  storageKey: DARK,
  // 暗黑class名字
  valueDark: 'dark',
  // 高亮class名字
  valueLight: 'light'
})

const toggle = useToggle(switchDark)
</script>
<style lang="scss" scoped>
.switch {
  margin-top: 9px;
  font-size: 12px !important;
}
</style>
