import i18n from '@/i18n'
import { watch } from 'vue'
import store from '@/store'
export function generateTitle (title) {
  // ! 避免刷后出现 vuei18n 失效的情况
  i18n.global.locale.value = store.getters.language
  return i18n.global.t('msg.route.' + title)
}
// 监听语言的变化 cbs 回调函数数组
export function watchSwitchLang (...cbs) {
  watch(() => store.getters.language, () => {
    cbs.forEach(cb => cb(store.getters.language))
  })
}
