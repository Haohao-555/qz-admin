<template>
  <el-card>
    <div ref="area_echartsRef" class="chart"></div>
  </el-card>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useEcharts } from '@/hook/useEcharts'
import * as echarts from 'echarts'
import { area_echart_option } from '../../data/echarts_Data'
const area_echartsRef = ref(null)

onMounted(() => {
  const area_charts = echarts.init(area_echartsRef.value)
  useEcharts(area_charts, area_echart_option)
})
</script>
<style lang="scss" scoped>
.chart {
  height: 400px;
}
</style>
