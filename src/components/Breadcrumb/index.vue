<template>
  <el-breadcrumb class="breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, i) in breadcrumData" :key="item.path">
        <!-- 不可点击 -->
        <span class="no-redirect" v-if="i == breadcrumData.length - 1">
          <span class="icon"><svg-icon :icon="item.meta.icon" /></span>
          <span>{{ item.meta.title }}</span>
        </span>
        <!-- 可点击 -->
        <span class="redirect" v-else @click="onLinkClick(item)">
          <span class="icon"><svg-icon :icon="item.meta.icon" /></span>
          <span>{{ item.meta.title }}</span>
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
.breadcrumb {
  display: inline-block;
  font-size: 16px;
  line-height: 60px;
  margin-left: 8px;
  .icon {
    margin-right: 6px;
  }
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      color: v-bind(linkHoverColor);
    }
  }
}
</style>
