import { login, logout } from '@/api/user'
import { ElMessage, ElNotification } from 'element-plus'
import { PAGE } from '@/constant'
import router, { resetRouter } from '@/router'
export default {
  namespaced: true,
  state: () => ({
    userInfo: {}
  }),
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    login(context, userInfo) {
      const { account, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ account, password }).then(res => {
          if (res.errorno === 0) {
            ElNotification({
              title: '登录成功',
              message: '欢迎来到 HM-ADMIN 后台管理系统',
              type: 'success',
              duration: 1500
            })
            router.push(PAGE)
          } else {
            ElMessage.error(res.message)
          }
          resolve()
        }).catch(err => reject(err))
      })
    },
    logout(context) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          if (res.errorno === 0) {
            resetRouter()
            this.commit('user/setUserInfo', {})
            router.push('/login')
          } else {
            ElMessage.error(res.message)
          }
        }).catch(err => reject(err))
      })
    }
  }
}
