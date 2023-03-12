import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import installElementPlus from './plugins/element'
import i18n from '@/i18n'
// 初始化样式表
import '@/styles/index.scss'
// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 自定义暗黑模式
import '@/styles/theme/element-dark.scss'
// 导入 svgIcon
import installIcons from '@/icons'
// 导入路由鉴权
import './permission'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
app.use(store).use(router).use(i18n).mount('#app')
