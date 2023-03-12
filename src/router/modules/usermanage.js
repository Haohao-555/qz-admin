import layout from '@/layout'
export default {
  path: '/user',
  component: layout,
  name: 'usermanage',
  redirect: '/user/manage',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/manage',
      name: 'usermanage',
      component: () => import('@/views/User-manage/index'),
      meta: {
        title: 'userManage',
        icon: 'personnel-manage'
      }
    }
  ]
}
