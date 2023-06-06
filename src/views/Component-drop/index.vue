<template>
  <div class="view-main-height">
    <grid-layout
      :layout="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
      >
        <component :is="item.component"></component>
      </grid-item>
    </grid-layout>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import comOne from './component/comOne'
import comTwo from './component/comTwo'
import comThree from './component/comThree'
const layout = reactive([
  { x: 0, y: 0, w: 6, h: 6, i: '0', component: comOne },
  { x: 8, y: 0, w: 4, h: 8, i: '1', component: comTwo },
  { x: 0, y: 6, w: 6, h: 5, i: '2', component: comThree }
])
</script>
<style>
.vue-grid-item.vue-grid-placeholder {
  background: var(--el-card-bg-color);
  opacity: 0.2;
  transition-duration: 100ms;
  z-index: 2;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
</style>
