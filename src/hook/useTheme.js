import { useStore } from 'vuex'
import { LIGHT_VALUE, DARK_VALUE, DEFAULT_COLOR } from '@/constant'
import color from 'css-color-function'
import rgbHex from 'rgb-hex'
export const useTheme = () => {
  const store = useStore()
  const lightColorMap = {
    '--el-color-primary-light-1': 'color(primary tint(10%))',
    '--el-color-primary-light-2': 'color(primary tint(20%))',
    '--el-color-primary-light-3': 'color(primary tint(30%))',
    '--el-color-primary-light-4': 'color(primary tint(40%))',
    '--el-color-primary-light-5': 'color(primary tint(50%))',
    '--el-color-primary-light-6': 'color(primary tint(60%))',
    '--el-color-primary-light-7': 'color(primary tint(70%))',
    '--el-color-primary-light-8': 'color(primary tint(80%))',
    '--el-color-primary-light-9': 'color(primary tint(90%))'
  }
  const darkColorMap = {
    '--el-color-primary-dark-1': 'color(primary shade(10%))',
    '--el-color-primary-dark-2': 'color(primary shade(20%))',
    '--el-color-primary-dark-3': 'color(primary shade(30%))',
    '--el-color-primary-dark-4': 'color(primary shade(40%))',
    '--el-color-primary-dark-5': 'color(primary shade(50%))',
    '--el-color-primary-dark-6': 'color(primary shade(60%))',
    '--el-color-primary-dark-7': 'color(primary shade(70%))',
    '--el-color-primary-dark-8': 'color(primary shade(80%))',
    '--el-color-primary-dark-9': 'color(primary shade(90%))'
  }

  const initDark = () => {
    const body = document.documentElement
    if (store.getters.isDark) body.setAttribute('class', DARK_VALUE)
    else body.setAttribute('class', LIGHT_VALUE)
  }

  const switchDark = () => {
    store.commit('theme/triggerDark')
    initDark()
    // !确保暗黑模式下主题色被修改
    changePrimary(store.gettersw.mainColor)
  }

  const changePrimary = (primaryColor) => {
    if (!primaryColor) {
      primaryColor = DEFAULT_COLOR
    }
    store.commit('theme/setMainColor', primaryColor)

    // 设置主题色
    document.documentElement.style.setProperty('--el-color-primary', store.getters.mainColor)

    // 设置 light 模式
    Object.keys(lightColorMap).forEach(key => {
      const value = lightColorMap[key].replace(/primary/g, primaryColor)
      document.documentElement.style.setProperty(key, '#' + rgbHex(color.convert(value)))
    })

    // 设置 Dark 模式
    Object.keys(darkColorMap).forEach(key => {
      const value = darkColorMap[key].replace(/primary/g, primaryColor)
      document.documentElement.style.setProperty(key, '#' + rgbHex(color.convert(value)))
    })
  }

  const initTheme = () => {
    const primaryColor = store.getters.mainColor
    initDark()
    changePrimary(primaryColor)
  }

  return {
    switchDark,
    changePrimary,
    initTheme
  }
}
