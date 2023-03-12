const whiteList = ['/login', '/404', '/401', '/500']
export function isTags(path) {
  return !whiteList.includes(path)
}
