import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
import layout from '@/layout/index'
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
          title: 'home',
          icon: 'home'
        }
      },
      {
        path: '/private',
        name: 'private',
        component: () => import('@/views/Private/index'),
        meta: {
          title: 'private',
          icon: 'private'
        }
      },
      // {
      //   path: '/chart',
      //   name: 'chart',
      //   redirect: '/chart/line',
      //   meta: {
      //     title: 'chart',
      //     icon: 'chart'
      //   },
      //   children: [
      //     {
      //       path: '/chart/line',
      //       name: 'chartline',
      //       component: () => import('@/views/Chart-line/index'),
      //       meta: {
      //         title: 'lineChart',
      //         icon: 'chart-item'
      //       }
      //     },
      //     {
      //       path: '/chart/tree',
      //       name: 'chartTree',
      //       component: () => import('@/views/Chart-tree/index'),
      //       meta: {
      //         title: 'treeChart',
      //         icon: 'chart-item'
      //       }
      //     },
      //     {
      //       path: '/chart/pie',
      //       name: 'chartpie',
      //       component: () => import('@/views/Chart-pie/index'),
      //       meta: {
      //         title: 'pieChart',
      //         icon: 'chart-item'
      //       }
      //     }
      //     // ! /chart 路径下的子路径在这里加
      //   ]
      // },
      {
        path: '/table',
        redirect: '/table/tablehook',
        name: 'table',
        meta: {
          title: 'superTable',
          icon: 'table'
        },
        children: [
          {
            path: '/table/tablehook',
            name: 'tableHook',
            component: () => import('@/views/Table-hook/index'),
            meta: {
              title: 'tableHook',
              icon: 'table-item'
            }
          },
          {
            path: '/table/tabletree',
            name: 'tableTree',
            component: () => import('@/views/Table-tree/index'),
            meta: {
              title: 'tableTree',
              icon: 'table-item'
            }
          }
          // ! /table 路径下的子路径在这里加
        ]
      },
      {
        path: '/component',
        redirect: '/component/icon',
        name: 'component',
        meta: {
          title: 'component',
          icon: 'component'
        },
        children: [
          {
            path: '/component/icon',
            name: 'icon',
            component: () => import('@/views/Component-icon/index'),
            meta: {
              title: 'icon',
              icon: 'component-item'
            }
          },
          {
            path: '/component/editor',
            name: 'editor',
            component: () => import('@/views/Component-editor/index'),
            meta: {
              title: 'editor',
              icon: 'component-item'
            }
          },
          {
            path: '/component/markdown',
            name: 'markdon',
            component: () => import('@/views/Component-markdown/index'),
            meta: {
              title: 'markDown',
              icon: 'component-item'
            }
          }
          // ! /component 路径下的子路径在这里加
        ]
      },
      {
        path: '/auth',
        redirect: '/auth/page',
        name: 'auth',
        meta: {
          title: 'auth',
          icon: 'auth'
        },
        children: [
          {
            path: '/auth/page',
            name: 'page',
            component: () => import('@/views/Auth-Page/index'),
            meta: {
              title: 'page',
              icon: 'auth-item'
            }
          },
          {
            path: '/auth/btn',
            name: 'bbb',
            component: () => import('@/views/Auth-Dom/index'),
            meta: {
              title: 'dom',
              icon: 'auth-item'
            }
          }
        ]
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/Error/404')
      },
      {
        path: '/usermessage',
        name: 'userMessage',
        component: () => import('@/views/Usermessage/index'),
        meta: {
          title: 'userMessage'
        }
      }
    ]
  }
]

// 私有路由
export const privateRoutes = [
  userrole, usermanage
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
