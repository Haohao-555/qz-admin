import { useStore } from 'vuex'
import { onMounted } from 'vue'
import { LIGHT_VALUE, DARK_VALUE } from '@/constant'
export const useDark = () => {
  const store = useStore()

  const addClass = () => {
    const body = document.documentElement
    if (store.getters.isDark) body.setAttribute('class', DARK_VALUE)
    else body.setAttribute('class', LIGHT_VALUE)
  }
  const switchDark = () => {
    store.commit('theme/triggerDark')
    addClass()
  }

  onMounted(() => addClass())

  return {
    switchDark
  }
}
