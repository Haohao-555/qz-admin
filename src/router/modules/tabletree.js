import layout from '@/layout'
export default {
  path: '/table',
  component: layout,
  name: 'tabletree',
  redirect: '/table/tablehook',
  meta: {
    title: '超级表格',
    icon: 'personnel'
  },
  children: [
    {
      path: '/table/tabletree',
      component: () => import('@/views/Table-tree/index'),
      meta: {
        title: 'Tree 表格',
        icon: 'personnel'
      }
    }
  ]
}
