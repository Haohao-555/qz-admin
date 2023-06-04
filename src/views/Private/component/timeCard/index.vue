<template>
  <el-card>
    <div class="time" v-for="(item, i) in dayDate" :key="i">
      <div v-html="item.text"></div>
      <el-progress :percentage="item.finsh" :indeterminate="true" />
    </div>
  </el-card>
</template>
<script setup>
import { reactive, onBeforeMount } from 'vue'
let dayDate = reactive([])

// 获取当前月份多少天
const getCurrentMonthtoDay = time => {
  const month = time.getMonth() + 1
  const year = time.getFullYear()
  return new Date(year, month, 0).getDate()
}
const initTimeItem = () => {
  const data = []
  const time = new Date()
  const currentMonthDay = getCurrentMonthtoDay(time)

  const hour = time.getHours()
  const finishHour = (hour / 24).toFixed(2)
  data[0] = {}
  data[0].text = `今天已经过去<span>&nbsp; ${hour} &nbsp;</span>个小时`
  data[0].finsh = finishHour * 100

  const today = time.getDay() === 0 ? 7 : time.getDay()
  const finishToday = ((today - 1) / 7).toFixed(2)
  data[1] = {}
  data[1].text = `这周已经过去<span>&nbsp; ${today - 1} &nbsp;</span>天`
  data[1].finsh = finishToday * 100

  const weeks = time.getDate()
  const finishWeeks = (weeks / currentMonthDay).toFixed(2)
  data[2] = {}
  data[2].text = `本月已经过去<span>&nbsp; ${weeks} &nbsp;</span>天`
  data[2].finsh = finishWeeks * 100

  const month = time.getMonth()
  const finishMonth = (month / 12).toFixed(2)
  data[3] = {}
  data[3].text = `本年已经过去<span>&nbsp; ${month} &nbsp;</span>个月`
  data[3].finsh = finishMonth * 100

  dayDate = data
}
onBeforeMount(() => {
  initTimeItem()
})
</script>
<style lang="scss" scoped>
.time {
  margin-bottom: 10px;
}
</style>
