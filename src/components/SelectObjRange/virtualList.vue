<template>
  <div>
    <el-checkbox-group :key="rendKey" v-model="checkList" @change="change">
      <RecycleScroller :style="style" class="custom-scrollbar" :items="list" :item-size="26" key-field="id">
        <template v-slot:default="{ item }">
          <el-tooltip placement="left">
            <div class="tree-node">
              <el-checkbox class="custom-checkbox" :value="item.id">
                <template #default>
                  <svg-icon :icon="getIcon(item)" />
                  <span class="text">{{ item.label }}</span>
                </template>
              </el-checkbox>
            </div>
            <template #content>
              <div>{{ item.data.path }}</div>
            </template>
          </el-tooltip>
        </template>
      </RecycleScroller>
    </el-checkbox-group>
  </div>
</template>
<script setup>
import { defineProps, computed, ref, defineEmits, watch, defineExpose } from 'vue'
const checkList = ref([])
const rendKey = ref(0)
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  height: {
    type: Number,
    default: 324
  },
  modelValue: {
    type: Array,
    default: () => []
  }
})

const style = computed(() => {
  return {
    height: `${props.height}px`
  }
})

watch(() => props.modelValue, (val) => {
  checkList.value = val
}, { immediate: true })

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

const change = (checkList) => {
  emit('update:modelValue', checkList)
}

const getCheckedNodes = () => {
  const data = props.list.filter(item => checkList.value.includes(item.id))
  return data.map(item => {
    const formItem = JSON.parse(JSON.stringify(item))
    return {
      ...formItem
    }
  })
}

const setChecked = (key, state) => {
  const isInclude = checkList.value.includes(key)
  if (state && !isInclude) {
    checkList.value.push(key)
  }

  if (!state && isInclude) {
    const index = checkList.value.findIndex(item => item === key)
    checkList.value.splice(index, 1)
  }
}

const setCheckedKeys = (keys) => {
  checkList.value = keys
}

defineExpose({
  getCheckedNodes,
  setChecked,
  setCheckedKeys
})
</script>
<style lang="scss" scoped>
.tree-node {
  display: flex;
  align-items: center;

  .text {
    display: inline-block;
    margin-left: 6px;
    flex: 1;
    font-size: 14px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

::v-deep .el-checkbox__label {
  width: 182px;
  display: flex;
  align-items: center;
}

::v-deep .el-checkbox {
  line-height: 26px;
}
</style>
