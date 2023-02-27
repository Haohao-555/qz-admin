import layout from '@/layout'
export default {
  path: '/table',
  component: layout,
  name: 'tablehook',
  redirect: '/table/tablehook',
  meta: {
    title: '超级表格',
    icon: 'table'
  },
  children: [
    {
      path: '/table/tablehook',
      component: () => import('@/views/Table-hook/index'),
      meta: {
        title: 'Hook 表格',
        icon: 'table-item'
      }
    }
  ]
}
