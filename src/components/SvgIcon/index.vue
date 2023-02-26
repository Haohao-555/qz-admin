<template>
  <!-- 外部图标 -->
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" :class="className"></div>
    <!-- 内部图标 -->
    <svg v-else class="svg-icon" :class="className" aria-hidden="true">
      <use :xlink:href="iconName"/>
  </svg>
</template>
<script setup>
import { isExternal as external } from '@/utils/validate'
import { defineProps, computed } from 'vue'
const props = defineProps({
  // icon 图标
  icon: {
    type: String,
    required: true
  },
  // 图标类名
  className: {
    type: String,
    default: ''
  }
})
// 判断当前图标是否为外部图标
const isExternal = computed(() => external(props.icon))
// 外部图标样式
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))
// 内部图标样式
const iconName = computed(() => `#icon-${props.icon}`)
</script>
<style lang="scss" scoped>
.svg {
  margin-right: 12px;
  line-height: 56px;
}
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  vertical-align: middle;
  // margin-right: 12px;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
