<template>
  <div class="chart-view view-main-height">
    <el-card class="container">
      <div ref="echartsRef" class="chart"></div>
    </el-card>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { useEcharts } from '@/hook/useEcharts'
import dataConfig from './data'
const echartsRef = ref(null)
onMounted(() => {
  const charts = echarts.init(echartsRef.value)

  const option = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    legend: {
      top: '2%',
      left: '3%',
      orient: 'vertical',
      data: [
        {
          name: 'tree1',
          icon: 'rectangle'
        },
        {
          name: 'tree2',
          icon: 'rectangle'
        }
      ],
      borderColor: '#c23531'
    },
    series: [
      {
        type: 'tree',
        name: dataConfig.backConfig.name,
        data: [dataConfig.backConfig],
        top: '20%',
        left: '60%',
        bottom: '22%',
        right: '18%',
        symbolSize: 7,
        label: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right'
        },
        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
          }
        },
        expandAndCollapse: true,
        emphasis: {
          focus: 'descendant'
        },
        animationDuration: 550,
        animationDurationUpdate: 750
      },
      {
        type: 'tree',
        name: dataConfig.frontConfig.name,
        data: [dataConfig.frontConfig],
        top: '5%',
        left: '7%',
        bottom: '2%',
        right: '60%',
        symbolSize: 7,
        label: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right'
        },
        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
          }
        },
        emphasis: {
          focus: 'descendant'
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750
      }
    ]
  }
  useEcharts(charts, option)
})
</script>
<style lang="scss" scoped>
.chart-view {
  .container {
    min-width: 980px;
    height: 100%;
    ::v-deep .el-card__body {
      height: 100%;
      padding: 0;
      .chart {
        height: 100%;
      }
    }
  }
}
</style>
