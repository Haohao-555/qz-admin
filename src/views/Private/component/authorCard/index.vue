<template>
  <el-card :body-style="{ padding: '0px' }">
    <div class="author-container">
      <img :src="require('@/assets/author.jpg')" class="image" />
      <div style="padding: 14px">
        <span class="author">усил</span>
        <div class="bottom">
          <external-tag :text="item.text" :link="item.link" v-for="(item, i) in tagList" :key="i"/>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script setup>
import { reactive } from 'vue'
import externalTag from '@/components/externalTag'
const tagList = reactive([
  {
    text: 'Github',
    link: 'http://github.com/Haohao-555'
  },
  {
    text: 'CSDN',
    link: 'https://blog.csdn.net/weixin_44659458'
  },
  {
    text: '掘金',
    link: 'https://juejin.cn/user/1258302989143437'
  },
  {
    text: '博客',
    link: 'http://hhmax.xyz'
  }
])
</script>
<style lang="scss" scoped>
.author-container {
  .author {
    font-size: 20px;
    &:hover {
      color: var(--el-color-primary);
      cursor: pointer;
    }
  }
  .bottom {
    padding-top: 12px;
    display: flex;
    flex-wrap: wrap;
  }

  .image {
    width: 100%;
    height: 170px;
    display: block;
  }
}
</style>
