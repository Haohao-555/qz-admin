// 路由解析
import path from 'path'

// TODO: 判断数据是否为空
function isNull (data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
}

// TODO: 获取所有子集路由
const getChilderenRoutes = routes => {
  const result = []
  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

// 去重获取路由
export const filtersRoutes = routes => {
  // 获取所有子集路由
  const childrenRoutes = getChilderenRoutes(routes)
  // 根据子集路由进行查重操作
  return routes.filter(route => {
    // 根据 route 在 childrenRoutes 中进行查重, 把所有重复路由表 剔除
    return !childrenRoutes.find(childrenRoute => {
      return childrenRoute.path === route.path
    })
  })
}

// 根据 routes（filterRoutes） 数据，返回对应 menu 规则数据
export const generateMenus = (routes, basePath = '') => {
  const result = []
  routes.forEach(item => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.children) && isNull(item.meta)) return
    // 存在 children, 不存在 meta，迭代 generateMenus
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 不存在 children，存在 meta || 存在 children && 存在 meta
    // 因为最终的 menu 需要进行 跳转， 此时我们需要合并 path
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，可能存在 同名父路由的情况
    let route = result.find(item => item.path === routePath)
    // 当前路由尚未加入到 result
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon && title
      if (route.meta.icon && route.meta.title) {
        result.push(route)
      }
    }
    // 存在 children && 存在 meta
    if (!isNull(item.children)) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
