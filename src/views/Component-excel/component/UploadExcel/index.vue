<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>

    <input ref="excelUploadInput" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleChange"/>

    <div class="drop" @drop.stop.prevent="handleDrop" @dragover.stop.prevent="handleDragover" @dragenter.stop.prevent="handleDragover">
      <el-icon><UploadFilled /></el-icon>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import XLSX from 'xlsx'
import { ref, defineProps } from 'vue'
import { getHeaderRow, isExcel } from './utils'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const loading = ref(false)

const props = defineProps({
  // 上传前回调
  beforeUpload: Function,
  // 成功回调
  onSuccess: Function
})

// 触发点击上传
const excelUploadInput = ref(null)
const handleUpload = () => {
  excelUploadInput.value.click()
  // 触发 hangleChange
}
const handleChange = (e) => {
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return
  upload(rawFile)
}
// 拖拽上传
// 当元素或选中的文本在可释放目标上被释放时触发
const handleDrop = (e) => {
  // 上传中
  if (loading.value) return
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('必须有一个文件')
    return
  }
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error('文件必须时.xlsx, .xls, .csv格式')
    return
  }
  upload(rawFile)
}
// 当元素或选中的文本被拖到一个可释放目标上时触发
const handleDragover = (e) => {
  e.dataTransfer.dropEffect = 'copy'
}

// 触发上传事件
const upload = rawFile => {
  excelUploadInput.value.value = null
  // 上传前回调
  if (!props.beforeUpload) {
    readerData(rawFile)
    return
  }
  // 如果指定了上传前回调，那么只有返回 true 才会执行后续操作
  const before = props.beforeUpload(rawFile)
  if (before) {
    readerData(rawFile)
  }
}
// 读取文件（异步）
const readerData = (rawFile) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    // 该事件在读取操作完成时触发
    reader.onload = e => {
      // 1. 获取解析到的数据
      const data = e.target.result
      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3. 获取第一张表格(工作簿)名称
      const firstSheetName = workbook.SheetNames[0]
      // 4. 只读取 Sheet1（第一张表格）的数据
      const worksheet = workbook.Sheets[firstSheetName]
      // 5. 解析数据表头
      const header = getHeaderRow(worksheet)
      // 6. 解析数据体
      const results = XLSX.utils.sheet_to_json(worksheet)
      // 7. 传入解析之后的数据
      generateData({ header, results })
      // 8. loading 处理
      loading.value = false
      // 9. 异步完成
      resolve()
    }
    // 启动读取指定的 Blob 或 File 内容
    reader.readAsArrayBuffer(rawFile)
  })
}
// 根据导入内容，生成数据
const generateData = excelData => {
  props.onSuccess && props.onSuccess(excelData)
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
