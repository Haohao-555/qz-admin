import layout from '@/layout/index'
export default {
  path: '/chart',
  component: layout,
  name: 'chartline',
  redirect: '/chart/line',
  meta: {
    title: 'chart',
    icon: 'personnel'
  },
  children: [
    {
      path: '/chart/line',
      name: 'chartline',
      component: () => import('@/views/Chart-line/index'),
      meta: {
        title: 'chartline',
        icon: 'memo'
      }
    }
  ]
}
