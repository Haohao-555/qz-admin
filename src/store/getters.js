const getters = {
  userInfo: state => state.user.userInfo,
  isLogin: state => state.user.isLogin,
  sidebarOpened: state => state.app.sidebarOpened
}
export default getters
