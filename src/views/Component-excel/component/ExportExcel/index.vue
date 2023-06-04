<template>
  <el-button type="primary" @click="exportData">{{ $t('msg.excel.exportExcel') }}</el-button>
</template>
<script setup>
import { defineProps, ref } from 'vue'
import { USER_RELATIONS } from './Export2ExcelConstants'
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
const excelName = ref('导出测试')
const exportData = async () => {
  const excel = await import('@/utils/Export2Excel')
  const data = formatJson(USER_RELATIONS, props.list)
  excel.export_json_to_excel({
    // excel 表头
    header: Object.keys(USER_RELATIONS),
    // excel 数据（二维数组结构）
    data,
    // 文件名称
    filename: excelName.value,
    // 是否自动列宽
    autoWidth: true,
    // 文件类型
    bookType: 'xlsx'
  })
}
// 该方法负责将数组转化成二维数组
const formatJson = (headers, rows) => {
  // 首先遍历数组
  // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
  return rows.map(item => {
    return Object.keys(headers).map(key => {
      // 特殊处理
      if (headers[key] === 'auth') {
        const roles = item[headers[key]]
        return JSON.stringify(roles)
      }
      return item[headers[key]]
    })
  })
}
</script>
<style lang="scss" scoped></style>
