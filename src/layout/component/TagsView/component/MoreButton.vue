<template>
  <el-dropdown trigger="click" :teleported="false">
    <el-button size="small" type="primary">
      <span style="padding-right: 6px">{{ $t('msg.moreBtn.text') }}</span>
      <el-icon><ArrowDown /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="refresh">
          <el-icon><Refresh /></el-icon>{{ $t('msg.moreBtn.refresh') }}
        </el-dropdown-item>
        <el-dropdown-item @click="maximize">
          <el-icon><FullScreen /></el-icon>{{ $t('msg.moreBtn.max') }}
        </el-dropdown-item>
        <el-dropdown-item divided @click="closeCurrentTab">
          <el-icon><Remove /></el-icon>{{ $t('msg.moreBtn.closeCurrent') }}
        </el-dropdown-item>
        <el-dropdown-item @click="closeOtherTab">
          <el-icon><CircleClose /></el-icon>{{ $t('msg.moreBtn.closeOther') }}
        </el-dropdown-item>
        <el-dropdown-item @click="closeRightTab">
          <el-icon><FolderDelete /></el-icon>{{ $t('msg.moreBtn.closeRight') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
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
const i18n = useI18n()

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
  const tagLength = store.getters.tagsViewList.length
  if (tagLength > 1) {
    store.commit('app/removeTagsView', {
      type: 'index',
      index: i.value
    })
    router.push(store.getters.tagsViewList[tagLength - 2].fullPath)
  } else {
    ElMessage({
      message: i18n.t('msg.toast.tagNotNull'),
      type: 'warning'
    })
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
<style lang="scss" scoped></style>
