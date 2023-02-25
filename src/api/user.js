import request from '@/utils/require'

// 登录 API
const LOGIN_API = '/user/login'
const LOGOUT_API = '/user/logout'

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
