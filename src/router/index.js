import { createRouter, createWebHashHistory } from 'vue-router'
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

export const errorRoutes = [
  {
    path: '/error',
    component: () => layout,
    meta: {
      title: '错误页',
      icon: 'error'
    },
    children: [
      {
        path: '/error/404',
        name: '404',
        component: () => import('@/views/Error/404'),
        meta: {
          title: '404',
          icon: '404'
        }
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/error/404'
  }
]

// 私有路由
export const privateRoutes = [
  chartline, componentguide, componenticon, componeteditor, componetmarkdown, tablehook, tabletree, userrole, usermanage
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router
