import { onMounted, onBeforeUnmount } from 'vue'
import store from '@/store'

export const useIsMobile = () => {
  const isMobile = () => {
    const state = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    const clientWidth = document.documentElement.clientWidth
    // TODO：关闭侧栏
    store.commit('app/changeSidebarOpened', false)
    if (state || clientWidth <= 900) { // 移动端
      // TODO：设置当前状态为移动端
      store.commit('app/changeIsMobile', true)
    } else { // PC 端
      // TODO：关闭侧栏抽屉
      store.commit('app/changeIsMobile', false)
    }
    // ! 确保两种状态（PC端 和 移动端）下的侧栏已经关闭
    store.commit('app/changeSidebarOpened', false)
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
