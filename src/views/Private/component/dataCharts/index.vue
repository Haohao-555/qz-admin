<template>
  <div class="data-charts">
    <el-row :gutter="10">
      <el-col
        :md="6"
        :lg="6"
        class="private-container"
        v-for="(item, i) in list"
        :key="i"
      >
        <el-card
          :style="{
            backgroundColor: item.bgc,
            opacity: !$store.getters.isDark ? '0.6' : '1'
          }"
        >
          <div class="charts-container">
            <div class="title">
              <svg-icon :icon="item.icon"></svg-icon>
              {{ $t('msg.private.' + item.text) || '' }}
            </div>
            <div class="num">{{ item.number || 10000 }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
const list = reactive([
  {
    bgc: '#FF0087',
    text: 'visit_num',
    icon: 'visit',
    number: 1314
  },
  {
    bgc: '#FF8C00',
    text: 'download_num',
    icon: 'download',
    number: 520
  },
  {
    bgc: '#00DDFF',
    text: 'call_num',
    icon: 'call',
    number: 66666666
  },
  {
    bgc: '#37A2FF',
    text: 'attention_num',
    icon: 'attent',
    number: '8463892'
  }
])
</script>
<style lang="scss" scoped>
.data-charts {
  .charts-container {
    ::v-deep .opacity {
      opacity: 0.5 !important;
    }
    height: 100px;
    .title {
      font-weight: bolder;
      font-size: 24px;
      margin-bottom: 20px;
    }

    .num {
      float: right;
      font-size: 30px;
      cursor: pointer;
    }
  }
}
</style>
