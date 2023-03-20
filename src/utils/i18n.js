import { watch } from 'vue'
import store from '@/store'

// 监听语言的变化 cbs 回调函数数组
export function watchSwitchLang (...cbs) {
  watch(() => store.getters.language, () => {
    cbs.forEach(cb => cb(store.getters.language))
  })
}
