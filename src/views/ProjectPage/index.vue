<template>
  <div class="section session-card">
    <el-timeline>
      <el-timeline-item v-for="project in projects" :key="project.title" :timestamp="project.timestamp" placement="top"
        type="primary" size="large" :hollow="true">
        <el-card>
          <div style="display: flex; justify-content: space-between;">
            <adminTitle class="timeline-title">{{ project.title }}</adminTitle>
            <el-tag class="timeline-sub">{{ project.role }}</el-tag>
          </div>
          <template v-for="(desc, index) in project.descriptions" :key="index">
            <p class="timeline-desc">
              <el-button type="text">{{ desc.type }}：</el-button>{{ desc.content }}
            </p>
          </template>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const projects = ref([
  {
    title: '数据分析系统',
    role: '全栈开发工程师',
    timestamp: '2022-07 - 2025-02-07',
    descriptions: [
      {
        type: '项目背景',
        content: 'IP-guard 服务端收集到企业内部员工客户端操作行为的原始数据，由于数据比较零散，没有形成有效的数据报表。导致企业内部无法更好的管理内部员工行为以及企业资产的管理。'
      },
      {
        type: '项目描述',
        content: '通过 IP-guard 服务端收集到的客户端数据为基础，并分不同的数据模块对数据进行定时拉取，清洗，聚合。通过设置行为策略，也能针对企业不同员工的生成行为预警报告。该项目主要是根据不同企业内部需求进行模块化定制开发。'
      },
      {
        type: '技术栈',
        content: 'vue2 全家桶+ element-ui + PHP（CodeIgniter）'
      },
      {
        type: '职责描述',
        content: '负责《软件安装与使用》《标签文档外传操作》模块前后端开发，以及《文档操作行为分析》模块前端开发'
      }
    ]
  },
  {
    title: '数据可视化看板系统',
    role: '前端开发工程师',
    timestamp: '2023-01 - 2025-02-07',
    descriptions: [
      {
        type: '项目背景',
        content: 'IPG-gurad 共有15个功能模块，该项目主要是针对这 15 个功能模块收集到的数据进行清洗，聚合形成数据图表。'
      },
      {
        type: '项目描述',
        content: '该项目通过不同功能模块最终形成15个大屏数据看板，主要看板有加密文档操作分析、上网行为分析、客户端运行情况、敏感文件操作分析、即时通讯工具使用分析、文件外传分析、软件安装与使用等看板。'
      },
      {
        type: '技术栈',
        content: 'vue全家桶+Echarts + AntV'
      },
      {
        type: '职责描述',
        content: '负责 15 个数据大屏前端（约 120 张图表）搭建，对常用图表（柱状图，曲线图，饼图，气泡图，柱状图，雷达图等）进行封装，最终实现可以由用户去自定义图表类型，自动化切换图表'
      }
    ]
  },
  {
    title: '通用后台管理系统',
    role: '全栈开发工程师',
    timestamp: '2023-01-2024-02',
    descriptions: [
      {
        type: '项目描述',
        content: '该项目的定位是使用当前比较成熟，且在日常开发中使用最多的技术栈进行开发，容易上手，力求将后台管理系统中常用的功能进行整合。目前在开源项目中这类系统有很多，也不缺乏优秀项目。这个项目跟其他同类型项目相比较下，也不能算很优秀。唯一有优势的地方在于该项目上手会比较容易，适合于刚参加工作或应届生学习（本人是 22 届的）。这并不代表该项目的使用的技术落后，该使用的技术都使用到了。该项目使用的是 vue3 全新全家桶以及后端 koa2，采用前后端分离的开发模式'
      },
      {
        type: '前端技术栈',
        content: 'Vue3.2.8 + Element-plus2.0.4 + Vue-router4.0.11 + Vuex4.0.2'
      },
      {
        type: '后端技术栈',
        content: 'Node + Koa2 + Mysql + Session + Redis + Sequelize'
      },
      {
        type: '项目地址',
        content: 'http://39.104.61.32/qz-admin'
      },
      {
        type: '项目仓库',
        content: 'https://github.com/Haohao-555/qz-admin'
      }
    ]
  },
  {
    title: '通用组件库',
    role: '前端开发工程师',
    timestamp: '2024-07 - 至今',
    descriptions: [
      {
        type: '项目背景',
        content: '该项目是由于平常工作中需要封装组件，客户端主要是使用React，而web端主要是使用vue进行封装。 公司也有自己的一套组件库。故自己利用空闲时间参考 element-plus 组件库的设计风格封装了该套组件库'
      },
      {
        type: '项目描述',
        content: '项目使用 vue 3.3，结合TypeScript 对组件进行参数类型说明。以及使用 vitest 对组件进行单元测试。最后通过 vite 进行打包。目前该组件库已封装 Button、Switch、Input、Select、Message、Dropdown 等组件。'
      },
      {
        type: '技术栈',
        content: 'vue 3.3 + TypeScript + vite 4.4 + vitest'
      },
      {
        type: '项目地址',
        content: 'http://39.104.61.32/v-site'
      },
      {
        type: '职责描述',
        content: '目前主要是参考 element-plus 的设计风格进行开发，并且使用 vitest 编写组件自动化测试用例'
      }
    ]
  }
])
</script>
<style lang="scss" scoped>
.timeline-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--el-color-primary);
  margin-bottom: 4px;
}

.timeline-sub {
  font-size: 15px;
  color: #888;
  margin-bottom: 6px;
}

.timeline-desc {
  font-size: 15px;
  color: #555;
  line-height: 1.7;
}

.session-card {
  padding: 15px;
}
</style>
