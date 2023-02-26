import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import installElementPlus from './plugins/element'
// 初始化样式表
import '@/styles/index.scss'
// 导入 svgIcon
import installIcons from '@/icons'
// 导入路由鉴权
import './permission'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
app.use(router).use(store).mount('#app')
