<template>
  <span class="external-tag">
    <a :href="link" target="_blank">{{ text }}</a>
  </span>
</template>
<script setup>
import { defineProps } from 'vue'

defineProps({
  text: {
    type: String,
    default: 'Github'
  },
  link: {
    type: String,
    default: 'http://github.com/Haohao-555'
  }
})

</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.external-tag {
  border-radius: 6px;
  line-height: 27px;
  margin: 0 3px;
  padding: 0 4px;
  border: 1px solid var(--el-color-primary);
  &:hover {
    background-color: var(--el-color-primary);
    color: var(--qz-admin-text-color);
  }
}
</style>
