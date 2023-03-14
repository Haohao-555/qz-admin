<template>
  <el-dialog
    :title="$t('msg.universal.title')"
    :model-value="modelValue"
    @close="closed"
  >
    <div class="content">
      <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
      <el-color-picker
        v-model="mColor"
        :predefine="predefineColors"
      ></el-color-picker>
    </div>
    <template #footer>
      <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
      <el-button type="primary" @click="confirm">{{
        $t('msg.universal.confirm')
      }}</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useStore } from 'vuex'
// import { generteNewStyle, writeNewStyle } from '@/utils/theme'
import { useTheme } from '@/hook/useTheme'
const { changePrimary } = useTheme()
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const store = useStore()
// 定义触发器
const emits = defineEmits(['update:modelValue'])

// 关闭事件
const closed = () => {
  // 抛出事件给父组件，将 modelValue 修改为 false 实现父子数据双向绑定
  emits('update:modelValue', false)
}

const confirm = async () => {
  store.commit('theme/setMainColor', mColor.value)
  changePrimary(mColor.value)
  closed()
}
// 预定义色值
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]

// 默认色值
const mColor = ref(store.getters.mainColor)
</script>
<style lang="scss" scoped>
.content {
  text-align: center;

  .title {
    margin-bottom: 12px;
  }
}
</style>
