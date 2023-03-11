import layout from '@/layout'
export default {
  path: '/user',
  component: layout,
  name: 'usermanage',
  redirect: '/user/manage',
  meta: {
    title: 'User',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/manage',
      component: () => import('@/views/User-manage/index'),
      meta: {
        title: 'User-Manage',
        icon: 'personnel-manage'
      }
    }
  ]
}
