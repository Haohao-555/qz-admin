import { onBeforeUnmount, onActivated, onDeactivated } from 'vue'
import { useDebounceFn } from '@vueuse/core'

export const useEcharts = (chart, options) => {
  if (options && typeof options === 'object') {
    chart.setOption(options)
  }

  const echartsResize = useDebounceFn(() => {
    chart && chart.resize()
  }, 100)

  window.addEventListener('resize', echartsResize)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', echartsResize)
  })

  onActivated(() => {
    window.addEventListener('resize', echartsResize)
  })

  onDeactivated(() => {
    window.removeEventListener('resize', echartsResize)
  })
}
