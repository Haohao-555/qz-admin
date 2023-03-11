<!-- 国际化 -->
<template>
  <el-dropdown  class="international" trigger="click" @command="handLeSetLanguage">
    <div>
      <el-tooltip :content="$t('msg.navBar.lang')" effect="dark">
        <span>
          <svg-icon id="guide-lang" icon="language" />
        </span>
      </el-tooltip>
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">中文</el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
const i18n = useI18n()
defineProps({
  effect: {
    type: String,
    default: 'drak',
    validator: function (value) {
      return ['drak', 'light'].indexOf(value) !== -1
    }
  }
})
const store = useStore()
const language = computed(() => store.getters.language)

// 切换语言方法
const handLeSetLanguage = lang => {
  // 切换 i18n 的 locale
  i18n.locale.value = lang
  // 修改 vuex 中保存的 language
  store.commit('app/setLanguage', lang)
  // 提示
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>
<style lang="scss" scoped>
.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
</style>
