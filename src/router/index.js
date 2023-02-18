import { createRouter, createWebHashHistory } from 'vue-router'

export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})
export default router
