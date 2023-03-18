<template>
  <div class="error-view">
    <el-result icon="error" title="404">
      <template #extra>
        <el-button type="danger" @click="back">{{
          $t('msg.errorPage.backBtn')
        }}</el-button>
      </template>
    </el-result>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { PAGE } from '@/constant'
const router = useRouter()
const back = () => (router.push(PAGE))

</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.error-view {
  height: calc(
    100vh - #{$headerHeight} - #{$tagViewHeight} - #{$footerHeight} - 20px
  );
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
