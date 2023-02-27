import layout from '@/layout'
export default {
  path: '/component',
  component: layout,
  name: 'componentguide',
  redirect: '/component/guide',
  meta: {
    title: '常用组件',
    icon: 'component'
  },
  children: [
    {
      path: '/component/guide',
      component: () => import('@/views/Component-guide/index'),
      meta: {
        title: '指引组件',
        icon: 'component-item'
      }
    }
  ]
}
