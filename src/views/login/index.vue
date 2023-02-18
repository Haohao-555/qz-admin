<template>
  <!-- <el-row justify="center"> -->
    <!-- <el-col> -->
      <div class="login-container">
        <el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginFromRef">
          <div class="title-container">
            <h3 class="title">登录</h3>
          </div>
          <el-form-item prop="username">
            <span class="icon">
              <svg-icon icon="user"></svg-icon>
            </span>
            <el-input placeholder="username" name="username" type="text" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <span class="icon">
              <svg-icon icon="password"></svg-icon>
            </span>
            <el-input placeholder="password" name="password" :type="passwordType" v-model="loginForm.password">
              <span class="show-pwd" @click="onChangePwdType">
                <svg-icon :icon="passwordType == 'password' ? 'eye' : 'eye-open'"></svg-icon>
              </span>
            </el-input>
          </el-form-item>
          <el-button type="primary" :loading="loading" style="width:100%; margin-bottom: 30px;" @click="handleLogin">登录</el-button>
        </el-form>
      </div>
    <!-- </el-col> -->
  <!-- </el-row> -->
</template>
<script setup>
import { ref } from 'vue'
import { validatePassword } from './rules.js'
const loading = ref(false)
const loginFromRef = ref(null)

// 数据源
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})

// 校验规则
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '不能为空'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})

// 处理密码框文本显示状态
const passwordType = ref('password')
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

const handleLogin = () => {}
</script>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .icon {
      display: inline-block;
      padding-left: 12px;
    }

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
