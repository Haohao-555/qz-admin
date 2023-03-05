import router from './router'
import store from './store'
import { isLogin } from '@/api/user'
import { PAGE } from '@/constant'
// 白名单
const whiteList = ['/login']

// 路由鉴权
router.beforeEach(async (to, from, next) => {
  if (!store.getters.hasUserInfo) { // 用户信息不存在
    const res = await isLogin()

    //! 未登录 或 信息已被删除
    if (res.errorno === 4000 || res.errorno === 6000) {
      if (whiteList.includes(to.path)) {
        next()
      }
      next('/login')
    }

    // 已登录
    if (res.errorno === 0) {
      store.commit('user/setUserInfo', res.data.userInfo)
      const permission = res.data.userInfo.auth || []
      const filterRoutes = await store.dispatch('permission/filterRoutes', permission)
      // 利用 addRoute 循环添加
      filterRoutes.forEach(item => router.addRoute(item))
      // ! 再次触发路由跳转
      next({ path: to.path })
    }
  }
  if (to.path === '/login') next(PAGE)
  next()
})
