<template>
  <div class="tag">
    <el-icon
      class="icon"
      v-if="isScroll && !$store.getters.isMobile"
      @click="scrollLeft"
      ><ArrowLeft
    /></el-icon>
    <div class="tag-view" ref="tagViewDom">
      <div class="wrapper" ref="tagWrapper">
        <router-link
          v-for="(tag, index) in showTagsViewList"
          :key="tag.fullPath"
          :to="{ path: tag.fullPath }"
          class="tag-item"
          :class="isActive(tag) ? 'active' : ''"
        >
          <svg-icon :icon="tag.meta.icon" />
          <span class="tag-text">{{ tag.title }}</span>
          <el-icon class="el-icon-close" v-if="!isActive(tag)">
            <Close @click.prevent.stop="onCloseClick(index)" />
          </el-icon>
        </router-link>
      </div>
    </div>
    <el-icon
      class="icon"
      v-if="isScroll && !$store.getters.isMobile"
      @click="scrollRight"
      ><ArrowRight
    /></el-icon>
    <div class="more-btn" v-if="!store.getters.isMobile">
      <MoreButton />
    </div>
  </div>
</template>
<script setup>
import { computed, watch, ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Close, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import MoreButton from './component/MoreButton'
const route = useRoute()
const store = useStore()

const tagViewDom = ref(null)
const tagWrapper = ref(null)

const isScroll = ref(true)
const isActive = (tag) => tag.path === route.path

const showTagsViewList = computed(() => {
  if (store.getters.isMobile) {
    return store.getters.tagsViewList.filter((tag) => tag.path === route.path)
  }
  return store.getters.tagsViewList
})

const tagViewListScroll = () => {
  nextTick(() => {
    if (!store.getters.isMobile) {
      console.dir(tagWrapper.value.scrollWidth)
      isScroll.value =
        tagViewDom.value.clientWidth < tagWrapper.value.scrollWidth
    } else {
      isScroll.value = false
    }
  })
}

const scrollLeft = () => {
  tagViewDom.value.scrollLeft = 0
}
const scrollRight = () => {
  tagViewDom.value.scrollLeft =
    tagWrapper.value.scrollWidth - tagViewDom.value.clientWidth
}
onMounted(() => tagViewListScroll())

watch(store.getters.tagsViewList, () => tagViewListScroll())

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
  padding-top: #{$headerHeight};
  .icon {
    display: inline-block;
    line-height: #{$tagViewHeight};
    padding-left: 10px;
  }
  .tag-view {
    flex: 1;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .wrapper {
      display: flex;
      box-sizing: border-box;
      padding: 0 10px;
      height: #{$tagViewHeight};
      line-height: #{$tagViewHeight};

      .tag-item {
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
  .more-btn {
    display: flex;
    align-items: center;
    width: 80px;
    margin-left: 30px;
    padding-right: 10px;
    box-sizing: border-box;
    height: #{$tagViewHeight};
  }
}
</style>
