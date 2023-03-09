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
        <el-dropdown-item divided @click="closeCurrentTab">
          <el-icon><Remove /></el-icon>关闭当前
        </el-dropdown-item>
        <el-dropdown-item @click="closeOtherTab">
          <el-icon><CircleClose /></el-icon>关闭其他
        </el-dropdown-item>
        <el-dropdown-item @click="closeRightTab">
          <el-icon><FolderDelete /></el-icon>关闭右侧
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { PAGE } from '@/constant'
import {
  Refresh,
  FullScreen,
  Remove,
  CircleClose,
  FolderDelete,
  ArrowDown
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const route = useRoute()
const store = useStore()
const router = useRouter()

const activeRoute = computed(() => route.fullPath)
const i = computed(() =>
  store.getters.tagsViewList.findIndex((tag) => tag.path === activeRoute.value)
)
// 刷新
const refresh = () => {
  router.go(0)
}

// 最大化
const maximize = () => {
  ElMessage('正在开发中。。。')
}

// 关闭当前
const closeCurrentTab = () => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index: i.value
  })
  if (store.getters.tagsViewList.length !== 0) {
    const path =
      store.getters.tagsViewList[store.getters.tagsViewList.length - 1].path
    router.push(path)
  } else {
    ElMessage({
      message: '标签导航栏不能为空',
      type: 'warning'
    })
    router.push(PAGE)
  }
}

// 关闭其他
const closeOtherTab = () => {
  store.commit('app/removeTagsView', {
    type: 'other',
    index: i.value
  })
}

// 关闭右侧
const closeRightTab = () => {
  store.commit('app/removeTagsView', {
    type: 'right',
    index: i.value
  })
}
</script>
<style lang="scss" scoped>
::v-deep .el-dropdown-menu__item--divided {
  line-height: 0px;
}
</style>
