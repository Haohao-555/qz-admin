import axios from 'axios'
// import { ElMessage } from 'element-plus'
import { isCheckTimeout } from '@/utils/auth'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})

// 请求接口拦截
service.interceptors.request.use(
  config => {
    // if (store.getters.token) { // 已登录
    if (isCheckTimeout()) { // otken 过期
      // TODO: 强制退出登录
      // store.dispatch('user/logout')
      return Promise.reject(new Error('token 失效'))
    }
    // }
    return config
  }
)

// 响应拦截器
// service.interceptors.response.use()
export default service
