import layout from '@/layout'
export default {
  path: '/table',
  component: layout,
  name: 'tablehook',
  redirect: '/table/tablehook',
  meta: {
    title: 'table',
    icon: 'discount'
  },
  children: [
    {
      path: '/table/tablehook',
      component: () => import('@/views/Table-hook/index'),
      meta: {
        title: 'tablehook',
        icon: 'memo'
      }
    }
  ]
}
