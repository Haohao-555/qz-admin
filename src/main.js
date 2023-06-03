import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from '@/i18n'
import installElementPlus from './plugins/element'
import JsonViewer from 'vue-json-viewer'

// 初始化样式表
import '@/styles/index.scss'
import 'element-plus/theme-chalk/display.css'
// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 自定义暗黑模式
import '@/styles/theme/element-dark.scss'
// 导入 svgIcon
import installIcons from '@/icons'
// 自定义指令
import installDirective from '@/directives'
// 自定义过滤器
import installFilter from '@/filters'
// 导入路由鉴权
import './permission'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
installFilter(app)
installDirective(app)
app.use(store).use(router).use(i18n).use(JsonViewer).mount('#app')
