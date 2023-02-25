import { createRouter, createWebHashHistory } from 'vue-router'

export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  }
]

export const privateRoute = []

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoute]
})
export default router
