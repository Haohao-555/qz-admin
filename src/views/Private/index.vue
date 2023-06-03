<template>
  <div class="private-view">
    <div class="container">
      <el-row :gutter="10" class="private-session">
        <el-col :md="20" :lg="20" :xs="24" :sm="24">
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
                  <el-button type="primary" @click="onSelect"
                    >{{ $t('msg.private.seeInfo') }}</el-button
                  >
                </div>
                <div class="intriduce">{{ userInfo.intriduce }}</div>
              </div>
            </div>
          </el-card>
          <el-card>
            <el-tabs v-model="tab_active" class="tabs-container">
              <el-tab-pane label="全部" name="first">
                <el-scrollbar>
                  <div class="tabs-item">
                    <el-collapse>
                      <el-collapse-item title="Consistency" name="1">
                        <div>
                          Consistent with real life: in line with the process
                          and logic of real life, and comply with languages and
                          habits that the users are used to;
                        </div>
                        <div>
                          Consistent within interface: all elements should be
                          consistent, such as: design style, icons and texts,
                          position of elements, etc.
                        </div>
                      </el-collapse-item>
                      <el-collapse-item title="Feedback" name="2">
                        <div>
                          Operation feedback: enable the users to clearly
                          perceive their operations by style updates and
                          interactive effects;
                        </div>
                        <div>
                          Visual feedback: reflect current state by updating or
                          rearranging elements of the page.
                        </div>
                      </el-collapse-item>
                      <el-collapse-item title="Efficiency" name="3">
                        <div>
                          Simplify the process: keep operating process simple
                          and intuitive;
                        </div>
                        <div>
                          Definite and clear: enunciate your intentions clearly
                          so that the users can quickly understand and make
                          decisions;
                        </div>
                        <div>
                          Easy to identify: the interface should be
                          straightforward, which helps the users to identify and
                          frees them from memorizing and recalling.
                        </div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </el-scrollbar>
              </el-tab-pane>
              <el-tab-pane label="待审批" name="third">
                <div class="tabs-item">待填充</div>
              </el-tab-pane>
              <el-tab-pane label="已审批" name="second">
                <div class="tabs-item">待填充</div>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
        <el-col :md="4" :lg="4" :xs="24" :sm="24" class="hidden-xs-only">
          <el-card :body-style="{ padding: '0px' }">
            <div class="author-container">
              <img :src="require('@/assets/author.jpg')" class="image" />
              <div style="padding: 14px">
                <span class="author">усил</span>
                <div class="bottom">
                  <external-tag
                    text="Github"
                    link="http://github.com/Haohao-555"
                  />
                  <external-tag
                    text="CSDN"
                    link="https://blog.csdn.net/weixin_44659458"
                  />
                  <external-tag
                    text="掘金"
                    link="https://juejin.cn/user/1258302989143437"
                  />
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="echart-session">
        <el-col :md="16" :lg="16" :xs="24" :sm="24">
          <el-card>
            <div ref="area_echartsRef" class="chart"></div>
          </el-card>
        </el-col>
        <el-col :md="8" :lg="8" :xs="24" :sm="24">
          <el-card>
            <div ref="nightingale_echartRef" class="chart"></div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="time-session"></el-row>
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
import { onMounted, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import * as echarts from 'echarts'
import { useEcharts } from '@/hook/useEcharts'
import { useI18n } from 'vue-i18n'
import externalTag from '@/components/externalTag'
import {
  area_echart_option,
  nightingale_echart_option
} from './data/echarts_Data.js'

const store = useStore()
const i18n = useI18n()

const tab_active = ref('first')
const area_echartsRef = ref(null)
const nightingale_echartRef = ref(null)

const userInfo = store.getters.userInfo

const drawer = reactive({
  enable: false,
  title: '',
  data: {}
})

onMounted(() => {
  const area_charts = echarts.init(area_echartsRef.value)
  const nightingale_echart = echarts.init(nightingale_echartRef.value)
  useEcharts(area_charts, area_echart_option)
  useEcharts(nightingale_echart, nightingale_echart_option)
})

const onSelect = (data) => {
  drawer.enable = true
  drawer.title = i18n.t('msg.userManage.drawer_title')
  drawer.data = userInfo
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.private-view {
  .container {
    min-width: 800px;

    .private-session {
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

      .tabs-container {
        .tabs-item {
          height: 146px;
        }
      }
      .author-container {
        // padding-bottom: 25px;
        .author {
          font-size: 20px;
          &:hover {
            color: var(--el-color-primary);
            cursor: pointer;
          }
        }
        .bottom {
          padding-top: 12px;
          display: flex;
        }

        .image {
          width: 100%;
          display: block;
        }
      }
    }

    .echart-session {
      .chart {
        height: 400px;
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
