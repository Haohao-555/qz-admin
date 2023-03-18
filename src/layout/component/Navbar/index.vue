<template>
  <div class="navbar">
    <hamburger class="hamburger-container" />
    <breadcrumb id="guide-breadcrumb" class="breadcrumb-container" />
    <div class="right-menu">
      <switch-dark class="right-menu-item hover-effect"></switch-dark>
      <theme-select class="right-menu-item hover-effect"></theme-select>
      <lang-select
        class="right-menu-item hover-effect"
        effect="dark"
      ></lang-select>
      <Screenfull class="right-menu-item hover-effect"></Screenfull>
      <header-search class="right-menu-item hover-effect"></header-search>
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="circle"
            :size="40"
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
import {} from 'vue'
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
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;
    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 6px 18px 0 0;
      font-size: 24px;
      color: var(--qz-admin-text-color);
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }
    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 10px;
        position: relative;
        .el-avatar {
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
