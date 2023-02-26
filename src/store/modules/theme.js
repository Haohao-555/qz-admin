import { getItem, setItem } from '@/utils/storage'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
import variable from '@/styles/variables.scss'
export default {
  namespaced: true,
  state: () => ({
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    variable: variable
  }),
  mutations: {
    setMainColor (state, newColor) {
      state.mainColor = newColor
      state.variable.menuBg = newColor
      setItem(MAIN_COLOR, newColor)
    }
  }
}
