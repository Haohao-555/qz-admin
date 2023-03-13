<template>
  <el-sub-menu v-if="route.children.length > 0" :index="route.path">
    <template #title>
      <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
    </template>
    <sidebar-item
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-sub-menu>
  <el-menu-item v-else :index="route.path">
    <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
  </el-menu-item>
</template>
<script setup>
import { defineProps, computed } from 'vue'
import { useStore } from 'vuex'
import MenuItem from './MenuItem'
const store = useStore()
const activeBg = computed(() => store.getters.mainColor)
defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>
<style lang="scss" scoped>
.el-menu-item.is-active {
  position: relative;
  color: v-bind(activeBg);
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    display: block;
    width: 3px;
    background-color: v-bind(activeBg);
  }
}
</style>
