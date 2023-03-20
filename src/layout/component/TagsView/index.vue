<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs
        type="card"
        @tab-click="tabClick"
        @tab-remove="tabRemove"
        v-model="activeTab"
      >
        <el-tab-pane
          v-for="item in showTabList"
          :key="item.path"
          :label="item.title"
          :name="item.path"
          :closable="true"
        >
          <template #label>
            <svg-icon class="tabs-icon" :icon="item.meta.icon"> </svg-icon>
            <span>{{  $t('msg.route.' + item.title)  }}</span>
          </template>
        </el-tab-pane>
      </el-tabs>
      <MoreButton v-if="!$store.getters.isMobile" />
    </div>
  </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import MoreButton from './component/MoreButton'
const mainColor = computed(() => store.getters.mainColor)
const route = useRoute()
const router = useRouter()
const store = useStore()
const i18n = useI18n()

const activeTab = ref(route.fullPath)

watch(
  () => route.fullPath,
  () => {
    activeTab.value = route.fullPath
  }
)

// 当前要显示的 tab
const showTabList = computed(() => {
  if (store.getters.isMobile) {
    return store.getters.tagsViewList.filter((tab) => tab.path === route.path)
  }
  return store.getters.tagsViewList
})

// tab 跳转
const tabClick = (tabItem) => {
  const fullPath = tabItem.props.name
  console.log(router.getRoutes())
  console.log('跳转地址', fullPath)
  console.log(router.getRoutes())
  router.push(fullPath)
}

// tab 移除
const tabRemove = (fullpath) => {
  const tagLength = store.getters.tagsViewList.length
  if (tagLength > 1) {
    const i = store.getters.tagsViewList.findIndex(
      (tab) => tab.path === fullpath
    )
    store.commit('app/removeTagsView', {
      type: 'index',
      index: i
    })
    router.push(store.getters.tagsViewList[tagLength - 2].fullPath)
  } else {
    ElMessage({
      message: i18n.t('msg.toast.tagNotNull'),
      type: 'warning'
    })
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.tabs-box {
  background-color: var(--qz-admin-bg-color);
  padding-top: #{$headerHeight};
  :deep(.tabs-menu) {
    position: relative;
    width: 100%;
    .el-dropdown {
      position: absolute;
      top: 8px;
      right: 13px;
    }
    .svg-icon {
      margin-right: 2px;
      margin-bottom: 2px;
    }
    .el-tabs__nav-wrap {
      position: absolute;
      width: calc(100% - 100px);
    }
    .el-tabs--card > .el-tabs__header {
      box-sizing: border-box;
      height: 40px;
      padding: 0 10px;
      margin: 0;
      border-bottom-color: var(--qz-admin-border-color);
    }
    .el-tabs--card > .el-tabs__header .el-tabs__nav {
      border: none;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item {
      color: var(--qz-admin-text-color-1);
      border: none;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
      color: v-bind(mainColor);
      border-bottom: 2px solid v-bind(mainColor);
    }
    .el-tabs__item .is-icon-close svg {
      margin-top: 0.5px;
    }
  }
}
</style>
