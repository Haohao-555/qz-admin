import { generateColors } from '@/utils/theme'
import { getItem } from '@/utils/storage'
import { MAIN_COLOR } from '@/constant'
const getters = {
  userInfo: state => state.user.userInfo,
  // 本地是否存在用户信息
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  // 侧栏是否展开
  sidebarOpened: state => state.app.sidebarOpened,
  // 侧栏是否展开 （抽屉）
  drawerSidebarOpened: state => state.app.drawerSidebarOpened,
  // 是否为移动端
  isMobile: state => state.app.isMobile,
  // 标签
  tagsViewList: state => state.app.tagsViewList,
  // 当前国际化语言
  language: state => state.app.language,
  // 当前主题色
  mainColor: state => state.theme.mainColor,
  // css 样式表
  cssVar: state => ({
    ...state.theme.variable,
    ...generateColors(getItem(MAIN_COLOR))
  })
}
export default getters
