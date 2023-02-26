import layout from '@/layout'
export default {
  path: '/component',
  component: layout,
  name: 'componenticon',
  redirect: '/component/guide',
  meta: {
    title: '常用组件',
    icon: 'personnel'
  },
  children: [
    {
      path: '/component/icon',
      component: () => import('@/views/Component-icon/index'),
      meta: {
        title: '图标',
        icon: 'personnel'
      }
    }
  ]
}
