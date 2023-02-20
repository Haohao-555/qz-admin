// 判断登录是否过期

import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { setItem, getItem } from '@/utils/storage'

// 获取时间戳
export function getTimeStamp () {
  return getItem(TIME_STAMP)
}

// 设置时间戳
export function setTimeStamp () {
  setItem(TIME_STAMP, Date.now())
}

// 检查登录是否过期
export function isCheckTimeout () {
  const currrentTime = Date.now()
  const timeStamp = getTimeStamp()
  return currrentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
