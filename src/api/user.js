import request from '@/utils/require'

// 登录 API
const LOGIN_API = '/user/login'
// 退出登录 API
const LOGOUT_API = '/user/logout'
// 是否已登录
const ISLOGIN_API = 'user/isLogin'

export const login = data => {
  return request({
    url: LOGIN_API,
    method: 'POST',
    data
  })
}

export const logout = () => {
  return request({
    url: LOGOUT_API,
    method: 'POST'
  })
}

export const isLogin = () => {
  return request({
    url: ISLOGIN_API,
    method: 'POST'
  })
}
