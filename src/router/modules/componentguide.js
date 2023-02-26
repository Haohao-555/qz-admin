import layout from '@/layout'
export default {
  path: '/component',
  component: layout,
  name: 'componentguide',
  redirect: '/component/guide',
  meta: {
    title: 'component',
    icon: 'personnel'
  },
  children: [
    {
      path: '/component/guide',
      component: () => import('@/views/Component-guide/index'),
      meta: {
        title: 'componentguide',
        icon: 'personnel'
      }
    }
  ]
}
