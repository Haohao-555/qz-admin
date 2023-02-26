import layout from '@/layout'
export default {
  path: '/component',
  component: layout,
  name: 'componenticon',
  redirect: '/component/guide',
  meta: {
    title: 'component',
    icon: 'personnel'
  },
  children: [
    {
      path: '/component/icon',
      component: () => import('@/views/Component-icon/index'),
      meta: {
        title: 'componenticon',
        icon: 'personnel'
      }
    }
  ]
}
