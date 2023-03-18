export default {
  backConfig: {
    name: 'qz-admin-back',
    children: [
      { name: 'config（配置文件）', value: '配置文件' },
      { name: 'constant（常量）', value: '常量' },
      { name: 'controller（控制层）', value: '控制层' },
      { name: 'db（数据库相关）', value: '数据库相关' },
      { name: 'middleware（中间件）', value: '中间件' },
      { name: 'public（静态文件）', value: '静态文件' },
      { name: 'routes（路由层）', value: '路由层' },
      { name: 'services（服务层）', value: '服务层' },
      { name: 'util（工具包）', value: '工具包' },
      { name: 'app.js（入口文件）', value: '入口文件' }
    ]
  },
  frontConfig: {
    name: 'qz-admin',
    children: [
      { name: 'api（接口）', value: '接口' },
      { name: 'assets（静态资源）', value: '静态资源' },
      { name: 'components（组件）', value: '组件' },
      { name: 'constant（常量）', value: '常量' },
      { name: 'directives（指令）', value: '指令' },
      { name: 'hook（钩子）', value: '钩子' },
      { name: 'i18n（国际化）', value: '国际化' },
      { name: 'icons（图标资源）', value: 'svg 图标资源' },
      { name: 'layout（布局）', value: '布局' },
      { name: 'plugins（插件）', value: '插件' },
      { name: 'router（路由）', value: '路由' },
      { name: 'store（全局状态管理）', value: '全局状态管理' },
      { name: 'styles（样式）', value: '样式' },
      { name: 'utils（工具包）', value: '工具包' },
      { name: 'views（页面）', value: '页面' },
      { name: 'App.vue（入口文件）', value: '入口文件' },
      { name: 'main.js（入口文件）', value: '入口文件' },
      { name: 'permission.js（路由权限）', value: '路由权限' },
      { name: 'setting.js（全局设置）', value: '全局设置' }
    ]
  }
}
