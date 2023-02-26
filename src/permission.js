import router from './router'
import store from './store'
import { isLogin } from '@/api/user'

// 白名单
const whiteList = ['/login']

// 路由鉴权
router.beforeEach(async (to, from, next) => {
  const res = await isLogin()
  if (res.data.isLogin) { // 已登录
    // 保存信息
    store.commit('user/setUserInfo', res.data.userInfo)
    store.commit('user/setisLogin', true)

    // 动态路由
    // TODO: const { permission = [] } = res.data.userInfo
    const permission = [
      'usermanage',
      'userrole',
      'tabletree',
      'tablehook',
      'componentguide',
      'componenticon',
      'componenteditor',
      'componentmarkdown',
      'chartline'
    ]
    const filterRoutes = await store.dispatch('permission/filterRoutes', permission)
    // 利用 addRoute 循环添加
    filterRoutes.forEach(item => {
      router.addRoute(item)
    })

    if (to.path === '/login') {
      next('/home')
    }
    next()
  } else { // 未登录
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
