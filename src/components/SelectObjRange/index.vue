<template>
  <el-tooltip :visible="visibleTooltip">
    <div class="range-contianer" @mouseenter="taggleTooltip(true)" @mouseleave="taggleTooltip(false)">
      <span class="objLabel">{{ objLabel }}</span>
      <el-input class="range" readonly size="small">
        <template #append>
          <el-button @click="showObjdialog" size="small">...</el-button>
        </template>
      </el-input>
    </div>
    <template #content v-if="objLabel.length != 0">
      <span class="tip">{{ objLabel }}</span>
    </template>
  </el-tooltip>
  <el-dialog draggable class="custom-dialog" :before-close="beforeClose" v-model="visible" width="580px" append-to-body
    header-class="custom-dialog__header" body-class="custom-dialog__body" footer-class="custom-dialog__footer">
    <template #header>选择对象范围</template>
    <div class="dialog-container">
      <div class="tree-container">
        <div class="title">
          <span class="text">请选择</span>
        </div>
        <div class="search-container">
          <el-input size="small" placeholder="请输入关键字" v-model="searchKey" @keyup.enter="handleSearch">
            <template #append>
              <el-button :icon="Search" size="small" @click="handleSearch"></el-button>
            </template>
          </el-input>
        </div>
        <div class="tree">
          <el-tree-v2 v-if="!isSearchState && !lazy" check-on-click-node :expand-on-click-node="false" ref="treeRef"
            check-strictly highlight-current :data="data" :props="treeProps" show-checkbox :height="324" node-key="id"
            @node-expand="handleNodeExpand">
            <template #default="{ node }">
              <div class="tree-node">
                <svg-icon :icon="getIcon(node.data)" />
                <span class="text">{{ node[treeProps.label] }}</span>
              </div>
            </template>
          </el-tree-v2>
          <el-scrollbar height="324px" v-if="!isSearchState && lazy">
            <el-tree ref="treeRef" lazy :load="loadNode" check-on-click-node :expand-on-click-node="false"
              :props="treeProps" :height="324" show-checkbox node-key="id" check-strictly>
              <template #default="{ node }">
                {{ node.label }}
              </template>
            </el-tree>
          </el-scrollbar>

          <virtualList ref="treeRef" v-if="isSearchState" :height="324" :list="searchList"
            v-model="checkNodesListBykey" />
        </div>
      </div>
      <div class="btn-container">
        <el-button size="small" type="text" @click="handleAdd">添加</el-button>
        <el-button size="small" type="text" @click="handleDel">删除</el-button>
        <el-button size="small" type="text" @click="handleClear">清空</el-button>
      </div>
      <div class="list-container">
        <div class="title">
          <span class="text">请选择</span>
        </div>
        <div class="list">
          <virtualList :height="360" :list="checkNodesList" v-model="cancelCheckList" />
        </div>
      </div>
    </div>
    <template #footer>
      <el-button size="small" type="primary" @click="confrim">确定</el-button>
      <el-button size="small" @click="cancel">取消</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, defineProps, nextTick, defineEmits, computed, toRaw } from 'vue'
import { ElMessageBox } from 'element-plus'
import { construct } from '@aximario/json-tree'
import { Search } from '@element-plus/icons-vue'
import isEqual from 'lodash/isEqual'
import virtualList from './virtualList.vue'
import { useTree } from './utils'

const treeRef = ref(null)
const visible = ref(false)
const checkNodesList = ref([])
const objLabel = ref('')
const cancelCheckList = ref([])
const searchKey = ref('')
const searchList = ref([])
const isSearchState = ref(false)
const visibleTooltip = ref(false)

// TODO 校验一下
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  lazy: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:value'])
const { getData, searchData, getLoadData } = useTree()

const checkNodesListBykey = computed(() => {
  return checkNodesList.value.map(item => item.id)
})

const treeProps = {
  value: 'id',
  label: 'label',
  children: 'children'
}
const flattenData = getData()
const data = construct(flattenData)

const taggleTooltip = (state) => {
  visibleTooltip.value = state && objLabel.value.length !== 0
}
const getIcon = (node) => {
  const { type } = node.data
  let icon = ''
  switch (type) {
    case 1:
      icon = 'region'
      break
    case 2:
      icon = 'depart'
      break
    case 3:
      icon = 'computer'
      break
    default:
      icon = 'computer'
      break
  }
  return icon
}

const loadNode = async (node, resolve) => {
  if (node.level === 0) {
    const res = await getLoadData()
    resolve(res)
  } else {
    const { id } = node.data
    const res = await getLoadData(id)
    resolve(res)
  }
}
const showObjdialog = () => {
  visible.value = true
  nextTick(() => {
    isSearchState.value = false
    searchKey.value = ''
    handleClear()
    nextTick(() => {
      treeRef.value.setCheckedKeys(props.modelValue)
      nextTick(() => handleAdd())
    })
  })
}

const handleNodeExpand = (node) => {
  console.log('handleNodeExpand', node)
}

const handleAdd = () => {
  const nodesList = treeRef.value.getCheckedNodes()
  checkNodesList.value = Array.from(new Map([...toRaw(checkNodesList.value), ...nodesList].map(item => [item.id, item])).values())
}
const handleDel = () => {
  if (cancelCheckList.value.length !== 0) {
    Array.from(cancelCheckList.value).forEach((key) => {
      treeRef.value.setChecked(key, false)
    })

    checkNodesList.value = checkNodesList.value.filter(item => !cancelCheckList.value.includes(item.id))
    cancelCheckList.value = []
  }
}
const handleClear = () => {
  treeRef.value.setCheckedKeys([])
  cancelCheckList.value = []
  checkNodesList.value = []
}
const handleSearch = () => {
  if (searchKey.value.length !== 0) {
    isSearchState.value = true
    searchList.value = searchData(searchKey.value)
  } else {
    isSearchState.value = false
    nextTick(() => {
      treeRef.value.setCheckedKeys(checkNodesList.value.map(item => item.id))
    })
  }
}

const confrim = () => {
  emit('update:modelValue', checkNodesList.value.map(item => item.id))
  objLabel.value = checkNodesList.value.reduce((acc, cur) => {
    acc = `${acc}${cur.label};`
    return acc
  }, '')
  visible.value = false
}
const cancel = () => {
  beforeClose()
}
const beforeClose = () => {
  const isequal = isEqual(checkNodesList.value.map(item => item.id), props.modelValue)
  if (isequal) {
    visible.value = false
    return
  }
  ElMessageBox.alert('数据发生了改变，是否需要修改', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    showCancelButton: true,
    callback: (action) => {
      if (action === 'confirm') {
        confrim()
      } else {
        visible.value = false
      }
    }
  })
}
</script>
<style lang="scss">
html.dark {
  --el-dialog-bg-head-color: #141414;
  --el-dialog-bg-foot-color: #141414;
  --border-color: rgb(65, 66, 67);
}

html.light {
  --el-dialog-bg-head-color: #f3f4f9;
  --el-dialog-bg-foot-color: #f3f4f9;
  --border-color: #dbdbdb;
}

.custom-dialog__header {
  background-color: var(--el-dialog-bg-head-color);
  border-bottom: 1px solid var(--border-color);
  font-size: 14px;
  padding: 8px 15px;
  margin: 0px;
  font-weight: 700;

  .el-dialog__headerbtn {
    width: 20px;
    height: 20px;
    right: 10px;
    top: 10px;
  }
}

.custom-dialog__body {
  padding: 8px 15px;
}

.custom-dialog__footer {
  background-color: var(--el-dialog-bg-foot-color);
  border-top: 1px solid var(--border-color);
  padding: 8px 15px;
}

.custom-dialog {
  padding: 0px !important;
}
</style>
<style lang="scss" scoped>
.range-contianer {
  position: relative;

  .objLabel {
    position: absolute;
    z-index: 1000;
    padding-left: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 75%;
  }
}

.dialog-container {
  height: 400px;
  display: flex;
  justify-content: space-between;

  .title {
    background: var(--el-dialog-bg-head-color);
    line-height: 28px;
    padding: 0 10px;
    box-sizing: border-box;
    border-bottom: 1px solid var(--border-color);

    .text {
      font-size: 12px;
      font-weight: 700;
    }
  }

  .tree-container {
    flex: 1;
    border-radius: 3px;
    border: 1px solid var(--border-color);
    align-self: stretch;
    display: flex;
    flex-direction: column;

    .search-container {
      padding: 10px 6px;
    }

    .tree {
      flex: 1;
      padding-left: 6px;
      box-sizing: border-box;

      .tree-node {
        line-height: 26px;
        display: flex;
        align-items: center;

        .custom-checkbox {
          margin-right: 6px;
        }

        .checkbox {
          margin-right: 6px;
        }

        .text {
          margin-left: 6px;
          flex: 1;
          width: 165px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }

  .btn-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60px;

    .el-button {
      margin: 3px 0px;
    }
  }

  .list-container {
    flex: 1;
    border-radius: 3px;
    border: 1px solid var(--border-color);
    align-self: stretch;
    display: flex;
    flex-direction: column;

    .list {
      flex: 1;
      padding-left: 6px;
      padding-top: 10px;
      box-sizing: border-box;

      .item {
        line-height: 26px;
        display: flex;
        align-items: center;
        font-size: 14px;

        .checkbox {
          margin-right: 8px;
        }

        .text {
          display: inline-block;
          width: 198px;
          margin-left: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}

.el-checkbox.is-checked+.tree-node {
  color: var(--el-color-primary);
}
</style>
