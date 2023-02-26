import layout from '@/layout'
export default {
  path: '/component',
  component: layout,
  name: 'componenteditor',
  redirect: '/component/guide',
  meta: {
    title: '常用组件',
    icon: 'personnel'
  },
  children: [
    {
      path: '/component/editor',
      component: () => import('@/views/Component-editor/index'),
      meta: {
        title: '富文本编辑器',
        icon: 'personnel'
      }
    }
  ]
}
