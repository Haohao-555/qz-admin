<template>
      <div class="login-container">
        <el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginFromRef">
          <div class="title-container">
            <h3 class="title">HM - ADMIN</h3>
          </div>
          <el-form-item prop="account">
            <span class="icon">
              <svg-icon icon="user"></svg-icon>
            </span>
            <el-input placeholder="account" name="account" type="text" v-model="loginForm.account"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <span class="icon">
              <svg-icon icon="password"></svg-icon>
            </span>
            <span class="show-pwd" @click="onChangePwdType">
              <svg-icon :icon="passwordType == 'password' ? 'eye' : 'eye-open'"></svg-icon>
            </span>
            <el-input placeholder="password" name="password" :type="passwordType" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-button type="primary" :loading="loading" style="width:100%; margin-bottom: 30px;" @click="handleLogin">登录</el-button>
        </el-form>
      </div>
</template>
<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { validatePassword } from './rules.js'

const store = useStore()

const loading = ref(false)
const loginFromRef = ref(null)
const passwordType = ref('password')

// 数据源
const loginForm = ref({
  account: 'super-admin',
  password: '123'
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

const handleLogin = () => {
  loginFromRef.value.validate(valid => {
    if (!valid) return
    loading.value = true
    store.dispatch('user/login', loginForm.value).then(() => {
      loading.value = false
    }).catch(err => {
      console.log(err)
      loading.value = false
    })
  })
}

// 处理密码框文本显示状态
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}
</script>
<style lang="scss" scoped>
$bg: #0D2644;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  position: relative;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  background-image: url(~@/assets/loginbg.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;

  .login-form {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    width: 520px;
    height: max-content;
    max-width: 100%;
    padding: 35px;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
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
      &::before {
        content: "";
        display: inline-block;
        width: 40px;
        height: 40px;
        background-image: url(~@/assets/logo.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        vertical-align: middle;
      }
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
