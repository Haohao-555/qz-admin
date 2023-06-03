<template>
  <el-card>
    <div ref="nightingale_echartRef" class="chart"></div>
  </el-card>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useEcharts } from '@/hook/useEcharts'
import * as echarts from 'echarts'
import { nightingale_echart_option } from '../../data/echarts_Data'
const nightingale_echartRef = ref(null)
onMounted(() => {
  const nightingale_echart = echarts.init(nightingale_echartRef.value)
  useEcharts(nightingale_echart, nightingale_echart_option)
})
</script>
<style lang="scss" scoped>
.chart {
  height: 400px;
}
</style>
