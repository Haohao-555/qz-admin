export const validatePassword = () => {
  return (rule, value, callback) => {
    if (value.length < 3) {
      callback(new Error('密码不能少于3位'))
    } else {
      callback()
    }
  }
}
