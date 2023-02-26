import layout from '@/layout'
export default {
  path: '/component',
  component: layout,
  name: 'componenteditor',
  redirect: '/component/guide',
  meta: {
    title: 'component',
    icon: 'personnel'
  },
  children: [
    {
      path: '/component/editor',
      component: () => import('@/views/Component-editor/index'),
      meta: {
        title: 'componenteditor',
        icon: 'personnel'
      }
    }
  ]
}
