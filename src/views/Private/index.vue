<template>
  <div class="private-view">
    <div class="container">
      <el-row :gutter="10" class="private-session">
        <el-col :md="20" :lg="20" :xs="24" :sm="24" class="private-container">
          <el-card>
            <div class="info-container">
              <div class="ava">
                <el-avatar :size="60" :src="userInfo.avatar" @error="true">
                  <img
                    src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                  />
                </el-avatar>
              </div>
              <div class="private-info">
                <div class="account">
                  <span
                    >早安，{{ userInfo.account }} 请开始您一天的工作吧！</span
                  >
                  <div>
                    <el-button type="primary" @click="onchange">{{
                      $t('msg.private.changeInfo')
                    }}</el-button>
                    <el-button type="primary" @click="onSelect">{{
                      $t('msg.private.seeInfo')
                    }}</el-button>
                  </div>
                </div>
                <div class="intriduce">{{ userInfo.intriduce }}</div>
              </div>
            </div>
          </el-card>
          <data-charts v-if="!$store.getters.isMobile" />
        </el-col>
        <el-col :md="4" :lg="4" :xs="24" :sm="24">
          <author-card v-if="!$store.getters.isMobile" />
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :md="18" :lg="18" :xs="24" :sm="24">
          <project-card />
        </el-col>
        <el-col :md="6" :lg="6" :xs="24" :sm="24">
          <time-card />
        </el-col>
        <el-col :md="16" :lg="16" :xs="24" :sm="24">
          <visit-charts />
        </el-col>
        <el-col :md="8" :lg="8" :xs="24" :sm="24">
          <date-charts />
        </el-col>
      </el-row>
    </div>
    <el-drawer
      v-model="drawer.enable"
      direction="rtl"
      :title="drawer.title"
      :size="$store.getters.isMobile ? '50%' : '20%'"
    >
      <el-avatar :size="80" :src="drawer.data.avatar">
        <img
          src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
        />
      </el-avatar>
      <h2 style="padding: 12px 0">{{ drawer.data.nickName }}</h2>
      <div>
        <json-viewer :value="drawer.data"></json-viewer>
      </div>
    </el-drawer>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import authorCard from './component/authorCard'
import dataCharts from './component/dataCharts'
import projectCard from './component/projectCard'
import visitCharts from './component/visitCharts'
import dateCharts from './component/dateCharts'
import timeCard from './component/timeCard'

const store = useStore()
const i18n = useI18n()
const router = useRouter()

const userInfo = store.getters.userInfo

const drawer = reactive({
  enable: false,
  title: '',
  data: {}
})

const onSelect = () => {
  drawer.enable = true
  drawer.title = i18n.t('msg.userManage.drawer_title')
  drawer.data = userInfo
}

const onchange = () => {
  router.push('/usermessage')
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.private-view {
  .container {
    min-width: 800px;

    .private-session {
      .private-container {
        display: flex;
        flex-direction: column;
        .info-container {
          display: flex;
          justify-content: space-between;
          .private-info {
            padding-left: 10px;
            padding-top: 4px;
            box-sizing: border-box;
            flex: 1;
            .account {
              display: flex;
              justify-content: space-between;
              font-weight: bolder;
              line-height: 30px;
              font-size: 20px;
              span:hover {
                color: var(--el-color-primary);
                cursor: pointer;
              }
            }
            .intriduce {
              line-height: 30px;
            }
          }
        }
      }
    }
  }
  ::v-deep .el-drawer {
    .el-drawer__body {
      display: flex !important;
      flex-direction: column;
      align-items: center;
    }
  }
  ::v-deep .el-row {
    margin: 0 !important;
  }
  ::v-deep .el-card {
    margin: 5px 0px;
  }
}
</style>
