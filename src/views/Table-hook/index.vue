<template>
  <div class="hooktable-view">
    <el-row :gutter="20" class="container">
      <el-col :md="16" :lg="16" :xs="24" :sm="24">
        <div class="home-container">
          <el-row :gutter="20">
            <el-col :md="6" :lg="6" :xs="24" :sm="24">
               <el-card style="background-color: #d9d9f3;">
                <div class="card">
                  <h4>今日访问量</h4>
                  <span class="num">5402</span>
                </div>
               </el-card>
            </el-col>
            <el-col :md="6" :lg="6" :xs="24" :sm="24">
              <el-card style="background-color: #dadada;">
                <div class="card">
                  <h4>昨日访问量</h4>
                  <span class="num">2432</span>
                </div>
               </el-card>
            </el-col>
            <el-col :md="6" :lg="6" :xs="24" :sm="24">
              <el-card style="background-color: #fff7f7;">
                <div class="card">
                  <h4>Github 访问量</h4>
                  <span class="num">7532</span>
                </div>
               </el-card>
            </el-col>
            <el-col :md="6" :lg="6" :xs="24" :sm="24">
              <el-card style="background-color: #ceefe4;">
                <div class="card">
                  <h4>Gitee 访问量</h4>
                  <span class="num">6311</span>
                </div>
               </el-card>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :md="8" :lg="8" :xs="24" :sm="24">
        <div class="home-aside-view"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.hooktable-view {
  margin-bottom: 20px;
  .card {
    height: 80px;
    .num {
      font-size: 40px;
      color: #fff;
      line-height: 80px;
    }
  }
}
</style>
