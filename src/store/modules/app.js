import { getItem, setItem } from '@/utils/storage'
import { TAGS_VIEW, LANG } from '@/constant'
export default {
  namespaced: true,
  state: () => ({
    // 侧栏是否展开
    sidebarOpened: true,
    // 侧栏是否展开 （抽屉）
    drawerSidebarOpened: false,
    // 是否为移动端
    isMobile: false,
    // 标签列表
    tagsViewList: getItem(TAGS_VIEW) || [],
    // 语言
    language: getItem(LANG) || 'zh'
  }),
  mutations: {
    triggerSidebarOpened(state) {
      if (state.isMobile) {
        state.drawerSidebarOpened = !state.drawerSidebarOpened
      } else {
        state.sidebarOpened = !state.sidebarOpened
      }
    },
    changeSidebarOpened(state, isOpen) {
      if (state.isMobile) {
        state.drawerSidebarOpened = isOpen
      } else {
        state.sidebarOpened = isOpen
      }
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
    },
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    }
  }
}
