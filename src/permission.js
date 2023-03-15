import router from './router'
import store from './store'
import { isLogin } from '@/api/user'
import { PAGE } from '@/constant'
import config from '@/setting'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: true, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

// 白名单
const whiteList = ['/login', '/404']

// 路由鉴权
router.beforeEach(async (to, from, next) => {
  NProgress.start()

  // 2.动态设置标题
  const title = config.project
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title

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

router.afterEach(() => {
  NProgress.done()
})

router.onError(error => {
  NProgress.done()
  console.warn('路由错误', error.message)
})
