import axios from 'axios'
import router from '@/router'
import { ElMessage } from 'element-plus'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true
})

// 请求接口拦截
service.interceptors.request.use(
  config => {
    return config
  }
)

// 响应拦截器
service.interceptors.response.use(response => {
  const { errorno, message } = response.data
  if (errorno === 6000) { // 信息被删除
    ElMessage.error(message)
    router.push('/login')
  }
  return response.data
}, error => {
  console.log(error)
  ElMessage.error('服务器发送错误')
})
export default service
