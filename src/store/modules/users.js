import { login, logout } from '@/api/user'
import { ElMessage } from 'element-plus'
import { setTimeStamp } from '@/utils/auth'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN, PAGE } from '@/constant'
import router from '@/router'
export default {
  namespaced: true,
  state: () => ({
    isLogin: getItem(TOKEN) || false,
    userInfo: {}
  }),
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setisLogin(state) {
      state.isLogin = true
      setItem(TOKEN, true)
    }
  },
  actions: {
    login(context, userInfo) {
      const { account, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ account, password }).then(res => {
          if (res.errno !== -1) { // 登录成功
            ElMessage.success('登录成功')
            // 保存用户信息
            // this.commit('user/setUserInfo', res.data)
            this.commit('user/setisLogin')
            // 保存登录时间
            setTimeStamp()
            // 路由跳转
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
          console.log('退出登录', res)
          // this.commit('user/setUserInfo', {})
          // this.commit('user/setisLogin', false)
        }).catch(err => reject(err))
      })
    }
  }
}
