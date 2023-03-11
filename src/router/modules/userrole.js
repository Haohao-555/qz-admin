import layout from '@/layout'
export default {
  path: '/user',
  component: layout,
  name: 'userrole',
  redirect: '/user/manage',
  meta: {
    title: 'User',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/role',
      component: () => import('@/views/User-role/index'),
      meta: {
        title: 'Role-Manage',
        icon: 'role'
      }
    }
  ]
}
