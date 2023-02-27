import layout from '@/layout/index'
export default {
  path: '/chart',
  component: layout,
  name: 'chartline',
  redirect: '/chart/line',
  meta: {
    title: '图表',
    icon: 'chart'
  },
  children: [
    {
      path: '/chart/line',
      name: 'chartline',
      component: () => import('@/views/Chart-line/index'),
      meta: {
        title: '线性图表',
        icon: 'chart-item'
      }
    }
  ]
}
