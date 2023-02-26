import layout from '@/layout'
export default {
  path: '/user',
  component: layout,
  name: 'usermanage',
  redirect: '/user/manage',
  meta: {
    title: '用户',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/manage',
      component: () => import('@/views/User-manage/index'),
      meta: {
        title: '用户管理',
        icon: 'personnel-manage'
      }
    }
  ]
}
