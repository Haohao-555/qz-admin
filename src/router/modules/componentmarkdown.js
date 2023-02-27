import layout from '@/layout'
export default {
  path: '/component',
  component: layout,
  name: 'componentmarkdown',
  redirect: '/component/guide',
  meta: {
    title: '常用组件',
    icon: 'component'
  },
  children: [
    {
      path: '/component/markdown',
      component: () => import('@/views/Component-markdown/index'),
      meta: {
        title: 'MarkDown',
        icon: 'component-item'
      }
    }
  ]
}
