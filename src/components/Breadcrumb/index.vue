<template>
  <el-breadcrumb class="breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, i) in breadcrumData" :key="item.path">
        <!-- 不可点击 -->
        <span class="no-redirect" v-if="i == breadcrumData.length - 1">
          <svg-icon :icon="item.meta.icon" />
          <span class="title">{{ item.meta.title }}</span>
        </span>
        <!-- 可点击 -->
        <span class="redirect" v-else @click="onLinkClick(item)">
          <svg-icon :icon="item.meta.icon" />
          <span class="title">{{ item.meta.title }}</span>
        </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const breadcrumData = ref([])
const getBreadcrumData = () => {
  // 当前路由的标准化路由记录
  breadcrumData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
}
// 监听路由变化
const route = useRoute()
watch(
  route,
  () => {
    getBreadcrumData()
  },
  { immediate: true }
)

const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)

const router = useRouter()
const onLinkClick = (item) => {
  router.push(item.path)
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.breadcrumb {
  display: inline-block;
  font-size: 16px;
  height: #{$headerHeight};
  line-height: #{$headerHeight};
  margin-left: 8px;
  .title {
    margin-left: 6px;
  }
  .no-redirect {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #97a8be;
    cursor: text;
  }
  .redirect {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    cursor: pointer;
    &:hover {
      color: v-bind(linkHoverColor);
    }
  }
}
</style>
