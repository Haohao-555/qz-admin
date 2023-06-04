<template>
  <div class="editor">
    <el-row :gutter="20">
      <el-col :md="18" :lg="18" :xs="24" :ms="24">
        <el-card>
          <template #header>
            <div class="card-header">
              <span> {{ $t('msg.route.editor') }}</span>
            </div>
          </template>
          <div class="editor-container">
            <div id="editor-box"></div>
            <div class="bottom">
              <el-button type="primary" @click="onSubmitClick">{{
                $t('msg.universal.confirm')
              }}</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :md="6" :lg="6" :xs="24" :ms="24">
        <el-card>
          <el-scrollbar>
            <div class="content" v-html="edit_content"></div>
          </el-scrollbar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import E from 'wangeditor'
import { onMounted, reactive, ref } from 'vue'
import i18next from 'i18next'
import { useStore } from 'vuex'
let editor = reactive()
const edit_content = ref('请使用富文本编辑内容')
const store = useStore()

onMounted(() => {
  initEditor(document.querySelector('#editor-box'))
})

const initEditor = (el) => {
  editor = new E(el)
  editor.config.zIndex = 1
  // 菜单栏提示
  editor.config.showMenuTooltips = true
  editor.config.menuTooltipPosition = 'down'
  // 国际化相关处理
  editor.config.lang = store.getters.language === 'zh' ? 'zh-CN' : 'en'
  editor.i18next = i18next
  editor.create()
}

const onSubmitClick = () => {
  edit_content.value = editor.txt.html()
}
</script>
<style lang="scss" scoped>
.editor {
  min-width: 900px;
  .editor-container {
    .bottom {
      margin-top: 20px;
      text-align: right;
    }
  }
  .content {
    height: 450px;
  }
}
::v-deep .el-row {
  margin: 0 !important;
}
</style>
