export default {
  namespaced: true,
  state: () => ({
    // 侧栏是否展开
    sidebarOpened: true,
    // 是否为移动端
    isMobile: false
  }),
  mutations: {
    triggerSidebarOpened (state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    changeSidebarOpened(state, flag) {
      state.sidebarOpened = flag
    },
    changeIsMobile(state, flag) {
      state.isMobile = flag
    }
  }
}
