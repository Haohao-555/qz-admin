<template>
  <div class="tag">
    <div class="tag-view">
      <div class="wrapper">
        <router-link
          v-for="(tag, index) in $store.getters.tagsViewList"
          :key="tag.fullPath"
          :to="{ path: tag.fullPath }"
          class="tag-item"
          :class="isActive(tag) ? 'active' : ''"
        >
          <svg-icon :icon="tag.meta.icon" />
          <span class="tag-text">{{ tag.title }}</span>
          <el-icon class="el-icon-close" v-show="!isActive(tag)">
            <Close @click.prevent.stop="onCloseClick(index)" />
          </el-icon>
        </router-link>
      </div>
    </div>
    <MoreButton />
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Close } from '@element-plus/icons-vue'
import MoreButton from './component/MoreButton'
const route = useRoute()
const store = useStore()

const isActive = (tag) => tag.path === route.path

const onCloseClick = (index) => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index: index
  })
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.tag {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  .tag-view {
    flex: 3;
    padding-top: #{$headerHeight};
    .wrapper {
      width: 100%;
      display: flex;
      overflow-y: auto;
      box-sizing: border-box;
      padding: 0 10px;
      height: #{$tagViewHeight};
      line-height: #{$tagViewHeight};
      // background-color: #fff;
      .tag-item {
        // background-color: #fff;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
        height: #{$tagViewHeight};
        line-height: #{$tagViewHeight};
        color: #ccc;
        font-size: 15px;
        text-align: center;
        border-bottom: 2px solid #fff;
        cursor: pointer;
        .el-icon-close {
          margin-left: 6px;
          font-size: 12px;
        }
        .tag-text {
          margin-left: 6px;
        }
        &.active {
          border-bottom-color: var(--el-color-primary);
          color: var(--el-color-primary) !important;
        }
        &:last-child {
          margin-right: 0px;
        }
        &:first-child {
          margin-left: 0px;
        }
      }
    }
  }
}
</style>
