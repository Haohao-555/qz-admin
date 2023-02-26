import layout from '@/layout'
export default {
  path: '/component',
  component: layout,
  name: 'componentmarkdown',
  redirect: '/component/guide',
  meta: {
    title: 'component',
    icon: 'personnel'
  },
  children: [
    {
      path: '/component/markdown',
      component: () => import('@/views/Component-markdown/index'),
      meta: {
        title: 'componentmarkdown',
        icon: 'personnel'
      }
    }
  ]
}
