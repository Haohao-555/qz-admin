<template>
  <div class="footer">{{ (config.footer && config.footer.title) || '' }}</div>
</template>
<script setup>
import config from '@/setting'
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.footer {
  height: #{footerHeight};
  line-height: 30px;
  text-align: center;
}
</style>
