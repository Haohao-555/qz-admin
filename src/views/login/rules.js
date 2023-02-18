export const validatePassword = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error('校验失败'))
    } else {
      callback()
    }
  }
}
