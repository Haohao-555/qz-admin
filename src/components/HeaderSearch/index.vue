<template>
 <div :class="{show: isShow}" class="header-search">
     <div @click.stop="onShowClick" style="display:inline-block;">
       <svg-icon id="guide-search" class-name="search-icon" icon="search"></svg-icon>
     </div>
     <el-select ref="headerSearchSelectRef" class="header-search-select" v-model="search" filterable default-first-option remote placeholder="Search" :remote-method="querySearch" @change="onSelectChange">
       <el-option v-for="option in searchOptions" :key="option.item.path" :label="option.item.title.join(' > ')" :value="option.item"></el-option>
     </el-select>
   </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { filtersRoutes } from '@/utils/route'
import { generateRoutes } from './FuseData'
import { watchSwitchLang } from '@/utils/i18n'
import Fuse from 'fuse.js'
const router = useRouter()

// el-select 实例
const headerSearchSelectRef = ref(null)
const isShow = ref(false)
// 待搜索关键词
const search = ref('')
// 搜索结果
const searchOptions = ref([])

// 数据源处理
let searchPool = computed(() => {
  const routes = filtersRoutes(router.getRoutes())
  return generateRoutes(routes)
})

// 初始化搜索库
let fuse
const initFuse = searchPool => {
  fuse = new Fuse(searchPool, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表
    // name: 搜索的键
    // weight 对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: '0.3'
      }
    ]
  })
}
initFuse(searchPool.value)

// 搜索
const querySearch = query => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
    console.log(searchOptions.value)
  } else {
    searchOptions.value = []
  }
}

// 展开搜索框
const onShowClick = () => {
  isShow.value = !isShow.value
  headerSearchSelectRef.value.focus()
}

// 关闭搜索框
const onClose = () => {
  headerSearchSelectRef.value && headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}

// 监听搜索框的显示与隐藏
watch(isShow, val => {
  if (val) {
    headerSearchSelectRef.value.focus()
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

// 路由跳转
const onSelectChange = val => {
  router.push(val.path)
  onClose()
}

// 监听语言的变化
watchSwitchLang(() => {
  searchPool = computed(() => {
    const routes = filtersRoutes(router.getRoutes())
    return generateRoutes(routes)
  })
  initFuse(searchPool.value)
})
</script>
<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  ::v-deep .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
