import layout from '@/layout'
export default {
  path: '/user',
  component: layout,
  name: 'userrole',
  redirect: '/user/manage',
  meta: {
    title: '用户',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/role',
      component: () => import('@/views/User-role/index'),
      meta: {
        title: '角色权限',
        icon: 'role'
      }
    }
  ]
}
