<template>
  <div class="usermanage-view">
    <div class="min-container">
      <el-card>
        <el-form :inline="true" :model="searchform">
          <el-form-item :label="$t('msg.userManage.account')">
            <el-input v-model="searchform.account" />
          </el-form-item>
          <el-form-item :label="$t('msg.userManage.nickname')">
            <el-input v-model="searchform.nickname" />
          </el-form-item>
          <el-form-item :label="$t('msg.userManage.role')">
            <el-select v-model="searchform.authId">
              <el-option label="全部" value="-1" />
              <el-option label="管理员" value="1" />
              <el-option label="用户" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('msg.userManage.gender')">
            <el-select v-model="searchform.gender">
              <el-option label="全部" value="-1" />
              <el-option label="男" value="1" />
              <el-option label="女" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('msg.userManage.state')">
            <el-select v-model="searchform.state">
              <el-option label="全部" value="-1" />
              <el-option label="启用" value="1" />
              <el-option label="禁止" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">{{
              $t('msg.btn.search')
            }}</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="table-container">
        <el-table
          :data="listInfo.list"
          border
          height="460px"
          :table-layout="fixed"
        >
          <el-table-column type="selection" width="40" fixed="left" />
          <el-table-column
            v-for="(item, index) in tableColumns"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :fixed="item.fixed"
            show-overflow-tooltip
          >
            <!-- 头像 -->
            <template #default="{ row }" v-if="item.prop === 'avatar'">
              <el-avatar :size="60" :src="row['avatar']">
                <img
                  src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                />
              </el-avatar>
            </template>
            <!-- 身份 -->
            <template #default="{ row }" v-else-if="item.prop === 'authId'">
              <el-tag :type="row.authId === '1' ? 'success' : 'info'">{{
                row.authId === '0' ? '用户' : '管理员'
              }}</el-tag>
            </template>
            <!-- 性别 -->
            <template #default="{ row }" v-else-if="item.prop === 'gender'">
              {{
                row.gender === '3' ? '保密' : row.gender === '1' ? '男' : '女'
              }}
            </template>
            <!-- 状态 -->
            <template #default="{ row }" v-else-if="item.prop === 'state'">
              <el-tag :type="row.state ? 'success' : 'danger'">{{
                row.state ? '启用' : '禁止'
              }}</el-tag>
            </template>
            <!-- 创建时间 -->
            <template
              #default="{ row }"
              v-else-if="item.prop === 'createdAtFormat'"
            >
              <div class="create-time">
                <el-icon><Clock /></el-icon>
                <span>{{ row.createdAtFormat }}</span>
              </div>
            </template>
            <!-- 更新时间 -->
            <template
              #default="{ row }"
              v-else-if="item.prop === 'updateAtFormat'"
            >
              {{ $filters.relativeTime(row.updateAtFormat) }}
            </template>
            <!-- 操作 -->
            <template #default="{ row }" v-else-if="item.prop === 'action'">
              <el-button
                @click="onSelect(row)"
                :icon="View"
                type="primary"
              ></el-button>
              <el-button @click="onEdit(row)" :icon="Edit"></el-button>
              <el-button
                @click="onDelect(row)"
                :icon="Delete"
                type="danger"
              ></el-button>
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
      <el-drawer
        v-model="drawer.enable"
        direction="rtl"
        :title="drawer.title"
        :size="$store.getters.isMobile ? '50%' : '20%'"
      >
        <el-avatar :size="80" :src="drawer.data.avatar">
          <img
            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
          />
        </el-avatar>
        <h2 style="padding: 12px 0">{{ drawer.data.nickName }}</h2>
        <div>
          <json-viewer :value="drawer.data"></json-viewer>
        </div>
      </el-drawer>
      <el-dialog
        v-model="dialog.enable"
        :title="dialog.title"
        :width="$store.getters.isMobile ? '100%' : '50%'"
      >
        <el-form :model="dialog.data" label-width="80px">
          <el-form-item :label="$t('msg.userManage.nickname')">
            <el-input v-model="dialog.form.nickName" />
          </el-form-item>
          <el-form-item :label="$t('msg.userManage.age')">
            <el-input v-model.number="dialog.form.age" />
          </el-form-item>
          <el-form-item :label="$t('msg.userManage.email')">
            <el-input v-model="dialog.form.email" />
          </el-form-item>
          <el-form-item :label="$t('msg.userManage.intriduce')">
            <el-input v-model="dialog.form.intriduce" type="textarea" />
          </el-form-item>
          <el-button type="primary" @click="onUpdate">
            {{ $t('msg.userManage.update') }}
          </el-button>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script setup>
import { reactive, onMounted, onActivated } from 'vue'
import { useI18n } from 'vue-i18n'
import { Delete, Edit, View, Clock } from '@element-plus/icons-vue'
import { getUserList } from '@/api/user'
import { ElMessage } from 'element-plus'
import { tableColumns } from './dynamic'

const i18n = useI18n()

const dialog = reactive({
  enable: false,
  title: '',
  data: {},
  form: {}
})
const drawer = reactive({
  enable: false,
  title: '',
  data: {}
})
const searchform = reactive({
  account: '',
  nickname: '',
  authId: '-1',
  gender: '-1',
  state: '-1'
})
const listInfo = reactive({
  pageSize: 10,
  pageIndex: 1,
  count: 0,
  list: [],
  where: {}
})

const getList = () => {
  getUserList({
    pageSize: listInfo.pageSize,
    pageIndex: listInfo.pageIndex - 1,
    where: listInfo.where || {}
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

const onSelect = (data) => {
  drawer.enable = true
  drawer.title = i18n.t('msg.userManage.drawer_title')
  drawer.data = data
}
const onEdit = (data) => {
  dialog.enable = true
  dialog.title = i18n.t('msg.userManage.dialog_title')
  dialog.data = data
  dialog.form = data
}
const onDelect = (data) => {}

const onUpdate = () => {
  // const nickName = dialog.form.nickName ? dialog.form.nickName : dialog.data.nickName
  // const age = dialog.form.age ? dialog.form.age : dialog.data.age
  // const email = dialog.form.nickName ? dialog.form.nickName : dialog.data.nickName
  // const intriduce = dialog.form.nickName ? dialog.form.nickName : dialog.data.nickName
  // updateUser({
  //   where: {
  //     id: dialog.data.id
  //   },
  //   data: Object.assign(dialog.data, { nickName, age, email, intriduce })
  // }).then(res => {
  //   if (res.errorno === '0') {
  //     ElMessage.success(res.message)
  //     dialog.enable = false
  //     getList()
  //   } else {
  //     ElMessage.error(res.message)
  //   }
  // })
}
// 搜索
const onSearch = () => {
  const searchWhere = {}
  const select = ['authId', 'gender', 'state']
  Object.keys(searchform).forEach((key) => {
    if (select.includes(key)) {
      if (searchform[key] !== '-1') searchWhere[key] = searchform[key]
    } else {
      if (searchform[key]) searchWhere[key] = searchform[key]
    }
  })
  listInfo.pageIndex = 1
  listInfo.where = searchWhere
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
@import '~@/styles/variables.scss';

.usermanage-view {
  .min-container {
    min-width: #{$minContainerWidth};
    .el-card {
      margin-bottom: 10px;
    }
    .table-container {
      .el-table {
        ::v-deep th {
          line-height: 40px;
        }
        .create-time {
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            padding-left: 6px;
          }
        }
      }
      .pagination {
        padding-top: 20px;
        width: max-content;
        margin: auto;
      }
    }
  }
  ::v-deep .el-drawer {
    .el-drawer__body {
      display: flex !important;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
