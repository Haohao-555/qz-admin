import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
import layout from '@/layout/index'
import chartline from './modules/chartline'
import componentguide from './modules/componentguide'
import componenticon from './modules/componenticon'
import componeteditor from './modules/componenteditor'
import componetmarkdown from './modules/componentmarkdown'
import tablehook from './modules/tablehook'
import tabletree from './modules/tabletree'
import userrole from './modules/userrole'
import usermanage from './modules/usermanage'

// 公有路由
export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/Login/index')
  },
  {
    path: '/',
    redirect: '/home',
    component: () => layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home/index'),
        meta: {
          title: '首页',
          icon: 'home'
        }
      }
    ]
  }
]

// 私有路由
export const privateRoutes = [
  chartline, componentguide, componenticon, componeteditor, componetmarkdown, tablehook, tabletree, userrole, usermanage
]

// 重置路由表
export const resetRouter = () => {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.auth
  ) {
    const menus = store.getters.userInfo.auth
    menus.forEach((item) => {
      router.removeRoute(item)
    })
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router
