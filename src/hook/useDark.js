import { useStore } from 'vuex'
export const useDark = () => {
  const store = useStore()
  const switchDark = () => {
    store.commit('theme/triggerDark')
    const body = document.documentElement
    if (store.getters.isDark) body.setAttribute('class', 'dark')
    else body.setAttribute('class', 'light')
  }

  return {
    switchDark
  }
}
