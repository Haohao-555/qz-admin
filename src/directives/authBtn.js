import store from '@/store'
function checkPermission (el, binding) {
  // 获取绑定的值，此处为权限
  const { value } = binding
  // 获取所有的功能指令
  const authId = store.getters.userInfo.authId

  let btnAuth = []
  if (authId === '1') { // 管理员权限
    btnAuth = ['export', 'delete', 'change']
  }
  // 当传入的指令集为数组时
  if (value && value instanceof Array) {
    // 匹配对应的指令
    const hasPermission = btnAuth.some(point => {
      return value.includes(point)
    })
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    // eslint-disabled-next-line
    throw new Error('v-permission value is ["admin","editor"]')
  }
}
export default {
  // 在绑定元素的父组件被挂载后调用
  mounted (el, binding) {
    checkPermission(el, binding)
  },
  // 在包含组件的 VNode 及其子组件的 VNode 更新后调用
  update (el, binding) {
    checkPermission(el, binding)
  }
}
