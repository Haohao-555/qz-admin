const getters = {
  userInfo: state => state.user.userInfo,
  isLogin: state => state.user.isLogin,
  // 本地是否存在用户信息
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  // 侧栏是否展开
  sidebarOpened: state => state.app.sidebarOpened,
  // css 样式表
  cssVar: state => ({
    ...state.theme.variable
  })
}
export default getters
