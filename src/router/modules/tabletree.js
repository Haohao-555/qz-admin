import layout from '@/layout'
export default {
  path: '/table',
  component: layout,
  name: 'tabletree',
  redirect: '/table/tablehook',
  meta: {
    title: 'table',
    icon: 'discount'
  },
  children: [
    {
      path: '/table/tabletree',
      component: () => import('@/views/Table-tree/index'),
      meta: {
        title: 'tabletree',
        icon: 'memo'
      }
    }
  ]
}
