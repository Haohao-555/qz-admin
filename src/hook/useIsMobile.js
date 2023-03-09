import { onMounted, onBeforeUnmount } from 'vue'
import store from '@/store'

export const useIsMobile = () => {
  const isMobile = () => {
    const state = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    const clientWidth = document.documentElement.clientWidth
    if (state || clientWidth <= 900) { // 移动端
      store.commit('app/changeIsMobile', true)
      // 关闭侧栏
      store.commit('app/changeSidebarOpened', false)
    } else { // PC 端
      store.commit('app/changeIsMobile', false)
      // 打开侧栏
      store.commit('app/changeSidebarOpened', true)
    }
  }

  onMounted(() => {
    isMobile()
    window.removeEventListener('resize', isMobile)
    window.addEventListener('resize', isMobile)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', isMobile)
  })
}
