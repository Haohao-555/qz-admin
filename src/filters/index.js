import dayjs from 'dayjs'
import rt from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import store from '@/store'
// 加载相对时间插件
dayjs.extend(rt)
function relativeTime (val) {
  if (!isNaN(val)) {
    val = parseInt(new Date(val).getTime())
  }
  return dayjs().locale(store.getters.language === 'zh' ? 'zh-cn' : 'en').to(dayjs(val))
}

export default app => {
  app.config.globalProperties.$filters = {
    relativeTime
  }
}
