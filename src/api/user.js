import request from '@/utils/require'

// 登录 API
const LOGIN_API = '/user/login'
// 退出登录 API
const LOGOUT_API = '/user/logout'
// 是否已登录
const ISLOGIN_API = '/user/isLogin'
// 获取用户列表
const GETUSERLIST_API = '/admin/list'
// 更新当前账号信息
const UPDATEUSER_API = '/user/updatePrivateInfo'
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

export const getUserList = (data) => {
  return request({
    url: GETUSERLIST_API,
    method: 'POST',
    data
  })
}

export const updateUser = (data) => {
  return request({
    url: UPDATEUSER_API,
    method: 'POST',
    data
  })
}
