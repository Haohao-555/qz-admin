<template>
  <div class="excel-container">
    <el-card style="margin-bottom: 10px">
      <template #header>
        <div class="card-header">
          <span> {{ $t('msg.excel.exportExcel') }}</span>
        </div>
      </template>
      <div class="export">
        <export-excel :list="exportdata" />
        <div class="export-content" v-if="showexportData">
          <el-scrollbar>
            <json-viewer :value="exportdata"></json-viewer>
          </el-scrollbar>
        </div>
      </div>
    </el-card>
    <el-card>
      <template #header>
        <div class="card-header">
          <span> {{ $t('msg.excel.importExcel') }}</span>
        </div>
      </template>
      <div class="import">
        <upload-excel :onSuccess="onSuccess"></upload-excel>
        <div class="import-content" v-if="showImportData">
          <el-scrollbar>
            <json-viewer :value="importdata"></json-viewer>
          </el-scrollbar>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import uploadExcel from './component/UploadExcel/index'
import exportExcel from './component/ExportExcel/index'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { reactive, ref, onMounted } from 'vue'
import { getUserList } from '@/api/user'
const i18n = useI18n()

let importdata = reactive([])
const showImportData = ref(false)
const onSuccess = ({ header, results }) => {
  showImportData.value = false
  ElMessage.success({
    type: 'success',
    message: i18n.t('msg.excel.importSuccess')
  })
  showImportData.value = true
  importdata = results
}

let exportdata = reactive([])
const showexportData = ref(false)
const getList = () => {
  showexportData.value = false
  getUserList({
    pageSize: 10,
    pageIndex: 0,
    where: {}
  }).then((res) => {
    if (res.errorno === 0) {
      exportdata = res.data.userList
      showexportData.value = true
    } else {
      ElMessage.error(res.message)
    }
  })
}
onMounted(() => {
  getList()
})
</script>
<style lang="scss" scoped>
.excel-container {
  .import {
    display: flex;
    justify-content: space-between;
    .import-content {
      flex: 1;
      // height: 400px;
    }
  }
}
</style>
