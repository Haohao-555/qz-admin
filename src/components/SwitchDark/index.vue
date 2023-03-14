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
import { computed } from 'vue'
import { useStore } from 'vuex'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useTheme } from '@/hook/useTheme'
const store = useStore()
const { switchDark } = useTheme()
const isDark = computed(() => store.getters.isDark)

const toggle = () => switchDark()
</script>
<style lang="scss" scoped>
.switch {
  margin-top: 9px;
  font-size: 12px !important;
}
</style>
