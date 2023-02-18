import SvgIcon from '@/components/SvgIcon'
// 加载 svg 文件 参数一：路径 参数二：是否扫描子目录 参数三：匹配什么文件后缀
const svgRequire = require.context('./svg', false, /\.svg$/)
// 导入所有 svg 图标
svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon))
// 完成 SvgIcon 的全局注册
export default app => {
  app.component('svg-icon', SvgIcon)
}
