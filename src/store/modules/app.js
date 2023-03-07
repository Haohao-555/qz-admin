import { getItem, setItem } from '@/utils/storage'
import { TAGS_VIEW } from '@/constant'
export default {
  namespaced: true,
  state: () => ({
    // 侧栏是否展开
    sidebarOpened: true,
    // 是否为移动端
    isMobile: false,
    // 标签列表
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    changeSidebarOpened(state, flag) {
      state.sidebarOpened = flag
    },
    changeIsMobile(state, flag) {
      state.isMobile = flag
    },
    addTagsViewList(state, tag) {
      const isFind = state.tagsViewList.find(item => item.path === tag.path)
      // 非重复
      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },
    changeTagsTitle(state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },
    removeTagsView(state, payload) {
      if (payload.type === 'index') {
        state.tagsViewList.splice(payload.index, 1)
      } else if (payload.type === 'other') {
        state.tagsViewList.splice(payload.index + 1, state.tagsViewList.length - payload.index + 1)
        state.tagsViewList.splice(0, payload.index)
      } else if (payload.type === 'right') {
        state.tagsViewList.splice(payload.index + 1, state.tagsViewList.length - payload.index + 1)
      }
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  }
}
