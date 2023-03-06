<template>
  <div class="tag-view">
    <div class="wrapper">
      <div class="tag-item active">
        <svg-icon icon="home"></svg-icon>
        <span class="tag-text">首页</span>
      </div>
      <div class="tag-item">
        <svg-icon icon="table-item"></svg-icon>
        <span class="tag-text">超级表格</span>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.tag-view {
  padding-top: #{$headerHeight};
  .wrapper {
    width: 100%;
    display: flex;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 0 10px;
    height: #{$tagViewHeight};
    line-height: #{$tagViewHeight};
    background-color: #fff;
    .tag-item {
      background-color: #fff;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 20px;
      height: #{$tagViewHeight};
      line-height: #{$tagViewHeight};
      color: #ccc;
      font-size: 15px;
      text-align: center;
      border-bottom: 2px solid #fff;
      cursor: pointer;
      .tag-text {
        margin-left: 6px;
      }
      &.active {
        border-bottom-color: var(--el-color-primary);
        color: var(--el-color-primary);
      }
      &:last-child {
        margin-right: 0px;
      }
      &:first-child {
        margin-left: 0px;
      }
    }
  }
}
</style>
