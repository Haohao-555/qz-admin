<template>
  <div class="usermanage-view">
    <div class="container">
      <el-card></el-card>
      <el-card class="table-container">
        <el-table :data="listInfo.list" border height="460px">
          <el-table-column type="selection" width="55" />
          <el-table-column
            v-for="(item, index) in tableColumns"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
          >
            <template #default="{ row }" v-if="item.prop === 'avatar'">
              <el-avatar :size="60" :src="row['avatar']">
                <img
                  src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                />
              </el-avatar>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="listInfo.pageIndex"
            :page-size="listInfo.pageSize"
            :page-sizes="[5, 10, 50, 100, 200]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="listInfo.count"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>
<script setup>
import { reactive, onMounted, onActivated } from 'vue'
import { getUserList } from '@/api/user'
import { ElMessage } from 'element-plus'
import { tableColumns } from './dynamic'
const listInfo = reactive({
  pageSize: 10,
  pageIndex: 1,
  count: 0,
  list: []
})
const getList = () => {
  getUserList({
    pageSize: listInfo.pageSize,
    pageIndex: listInfo.pageIndex - 1
  }).then((res) => {
    if (res.errorno === 0) {
      listInfo.count = res.data.count
      listInfo.list = res.data.userList
    } else {
      ElMessage.error(res.message)
    }
  })
}

const handleSizeChange = (currentSize) => {
  listInfo.pageSize = currentSize
  getList()
}

const handleCurrentChange = (currentPage) => {
  listInfo.pageIndex = currentPage
  getList()
}

const tableTitle = [
  'account',
  'age',
  'city',
  'gender',
  'idcard',
  'intriduce',
  'createdAtFormat',
  'avatar',
  'email',
  'state',
  'updateAtFormat'
]
console.log(tableTitle)
onMounted(() => getList())
onActivated(() => getList())
</script>
<style lang="scss" scoped>
.usermanage-view {
  .container {
    .el-card {
      margin-bottom: 10px;
    }
    .table-container {
      .el-table {
        ::v-deep th {
          line-height: 40px;
        }
      }
      .pagination {
        padding-top: 20px;
        width: max-content;
        margin: auto;
      }
    }
  }
}
</style>
