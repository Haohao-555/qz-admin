<template>
  <div class="project-card">
    <el-card>
      <template #header>
        <div class="card-header">
          <el-icon><Notebook /></el-icon>
          <span> {{ $t('msg.private.project_introduction') }}</span>
        </div>
      </template>
      <el-collapse>
        <el-collapse-item :title="$t('msg.private.author')">
          <div>
            ✍️大家好，我是小黄同学，22届软件工程毕业的，就读于中山大学南方学院。目前在广州一家从事内网安全的公司就职，岗位是
            Web 开发攻城狮
          </div>
        </el-collapse-item>
        <el-collapse-item :title="$t('msg.private.front')">
          <div>Vue3.2.8 + Element-plus2.0.4 + Vue-router4.0.11 + Vuex4.0.2</div>
          <div>Echarts + AntV 实现数据可视化</div>
          <div>使用 Eslint + prettier 进行代码约束和格式统一</div>
          <div>集成 husky + commitlint 提高代码规范化</div>
        </el-collapse-item>
        <el-collapse-item :title="$t('msg.private.back')">
          <div>技术栈 Node + Koa2 + Mysql + Session + Redis + Sequelize ，</div>
          <div>MVC 的开发模式。路由层、控制层、服务层</div>
          <div>使用 Session + redis 实现用户信息通讯、加密及保存</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>
<script setup>
import { Notebook } from '@element-plus/icons-vue'
</script>
<style lang="scss" scoped>
.project-card {
  .card-header {
    display: flex;
    align-items: center;
  }
}
</style>
