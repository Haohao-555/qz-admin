<template>
  <div class="markdown-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span> {{ $t('msg.route.markDown') }}</span>
        </div>
      </template>
      <div id="markdown-box"></div>
      <div class="bottom">
        <el-button type="primary" @click="onSubmitClick">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import MkEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

const store = useStore()

let mkEditor = reactive()

onMounted(() => {
  initEditor(document.querySelector('#markdown-box'))
})

const initEditor = (el) => {
  mkEditor = new MkEditor({
    el,
    height: '500px',
    previewStyle: 'vertical',
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })
  mkEditor.getMarkdown()
}

const onSubmitClick = () => {
  ElMessage('打开控制台')
  console.log(mkEditor.getHTML())
}
</script>
<style lang="scss" scoped>
.markdown-container {
  min-width: 900px;
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
