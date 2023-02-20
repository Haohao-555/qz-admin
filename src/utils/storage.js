// 缓存设置

// 设置值
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 获取值
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// 删除值
export const removeItem = key => {
  window.localStorage.renoveItem(key)
}

// 删除所有数据
export const removeAllItem = key => {
  window.localStorage.clear()
}
