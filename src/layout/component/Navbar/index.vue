<template>
  <div class="navbar">
    <div>
      <hamburger class="hamburger-container" />
      <breadcrumb id="guide-breadcrumb" class="breadcrumb-container" />
    </div>
    <div class="right">
      <div class="menu">
        <div v-for="(item, id) in toolsList" :key="id">
          <component :is="item.component" class="menu-item"></component>
        </div>
      </div>
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="circle"
            :size="36"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link :to="PAGE">
              <el-dropdown-item>
                <el-icon><House /></el-icon>
                {{ $t('msg.navBar.home') }}
              </el-dropdown-item>
            </router-link>
            <a target="_blank" href="">
              <el-dropdown-item>
                <el-icon><Edit /></el-icon>
                {{ $t('msg.navBar.changePw') }}
              </el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="handLogout">
              <el-icon><SwitchButton /></el-icon>
              {{ $t('msg.navBar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import router, { resetRouter } from '@/router'
import { logout } from '@/api/user'
import hamburger from '@/components/Hamburger/index'
import breadcrumb from '@/components/Breadcrumb/index'
import LangSelect from '@/components/LangSelect/index'
import ThemeSelect from '@/components/ThemeSelect/index'
import SwitchDark from '@/components/SwitchDark/index'
import HeaderSearch from '@/components/HeaderSearch/index'
import Screenfull from '@/components/Screenfull/index'
import { SwitchButton, House, Edit } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { PAGE } from '@/constant'
import { removeAllItem } from '@/utils/storage'

const store = useStore()

// 功能区域
const toolsList = computed(() => {
  const isMobile = store.getters.isMobile
  if (isMobile) {
    return [{ id: 1, component: SwitchDark }]
  }
  return [
    { id: 1, component: SwitchDark },
    { id: 2, component: ThemeSelect },
    { id: 3, component: LangSelect },
    { id: 4, component: Screenfull },
    { id: 5, component: HeaderSearch }
  ]
})
// 退出登录
const handLogout = () => {
  logout().then((res) => {
    if (res.errorno === 0) {
      // 重置路由
      resetRouter()
      // 清除用户信息
      store.commit('user/setUserInfo', {})
      // 请求缓存
      removeAllItem()
      // 清除标签栏
      store.commit('app/removeTagsView', { type: 'all' })
      // 跳转到登录页面
      router.push('/login')
    } else {
      ElMessage.error(res.message)
    }
  })
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.navbar {
  height: #{$headerHeight};
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  padding-right: 12px;
  box-sizing: border-box;
  position: relative;
  background-color: var(--qz-admin-bg-color);
  border-bottom: 1px solid var(--qz-admin-border-color);

  .hamburger-container {
    line-height: #{$headerHeight};
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.5s;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    .menu {
      display: flex;
      align-items: center;
      ::v-deep .menu-item {
        display: inline-block;
        padding: 6px 18px 0 0;
        padding-top: 2px;
        font-size: 24px;
        color: var(--qz-admin-text-color);
        vertical-align: text-bottom;
        cursor: pointer;
      }
    }
    ::v-deep .avatar-container {
      cursor: pointer;
    }
  }
}
</style>
