export const validatePassword = (error) => {
  return (rule, value, callback) => {
    if (value.length < 3) {
      callback(new Error(error))
    } else {
      callback()
    }
  }
}
