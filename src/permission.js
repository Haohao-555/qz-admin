import router from './router'
import store from './store'
import { isLogin } from '@/api/user'

// 白名单
const whiteList = ['/login']

// 路由鉴权
router.beforeEach(async (to, from, next) => {
  console.log(123)
  if (store.getters.isLogin) { // 已登录
    if (!store.getters.hasUserInfo) {
      const res = await isLogin()
      console.log(res, '123')
      store.commit('user/setUserInfo', res.data.userInfo)
      // 动态路由
      // TODO: const { permission = [] } = store.getters.userInfo
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
      filterRoutes.forEach(item => router.addRoute(item))
      next({ path: to.path })
    }

    if (to.path === '/login') {
      next('/')
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
