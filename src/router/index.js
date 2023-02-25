import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
import layout from '@/layout/index'

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
          title: 'home',
          icon: 'personnel'
        }
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401'),
        meta: {
          title: '401',
          icon: 'personnel'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404'),
        meta: {
          title: '404',
          icon: 'personnel'
        }
      }
    ]
  }
]

export const privateRoute = [
  {

  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoute]
})

// 路由守卫
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  if (store.getters.isLogin) {
    if (to.path === '/login') {
      next('/home')
    }
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
