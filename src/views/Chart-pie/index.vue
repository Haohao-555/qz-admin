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
const echartsRef = ref(null)
onMounted(() => {
  const charts = echarts.init(echartsRef.value)
  const option = {
    backgroundColor: '#2c343c',
    title: {
      text: 'Customized Pie',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#ccc'
      }
    },
    tooltip: {
      trigger: 'item'
    },
    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1]
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: [
          { value: 335, name: 'Direct' },
          { value: 310, name: 'Email' },
          { value: 274, name: 'Union Ads' },
          { value: 235, name: 'Video Ads' },
          { value: 400, name: 'Search Engine' }
        ].sort(function (a, b) {
          return a.value - b.value
        }),
        roseType: 'radius',
        label: {
          color: 'rgba(255, 255, 255, 0.3)'
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        },
        itemStyle: {
          color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200
        }
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
