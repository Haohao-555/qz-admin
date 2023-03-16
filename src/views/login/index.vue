<template>
  <div class="login-view">
    <el-row justify="center" align="middle">
      <el-col :md="20" :lg="20" :xs="24" :sm="24">
        <el-card>
          <div class="login-container">
            <div class="login-bg" v-if="!$store.getters.isMobile"></div>
            <div class="login-form">
              <el-form class="form-container" :model="loginForm" :rules="loginRules" ref="loginFromRef">
                <div class="title-container">
                  <h3 class="title">{{ config.project }}</h3>
                </div>
                <el-form-item prop="account">
                  <span class="icon">
                    <svg-icon icon="user"></svg-icon>
                  </span>
                  <el-input placeholder="账号 39436" name="account" type="text" v-model="loginForm.account"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <span class="icon">
                    <svg-icon icon="password"></svg-icon>
                  </span>
                  <span class="show-pwd" @click="onChangePwdType">
                    <svg-icon :icon="passwordType == 'password' ? 'eye' : 'eye-open'"></svg-icon>
                  </span>
                  <el-input placeholder="密码 3347" name="password" :type="passwordType" v-model="loginForm.password"></el-input>
                </el-form-item>
                <div class="btn-group">
                  <el-button type="primary" :loading="loading" style="width:100%; margin-bottom: 30px;" @click="handleLogin">登录</el-button>
                </div>
              </el-form>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { validatePassword } from './rules.js'
import config from '@/setting'
const store = useStore()

const loading = ref(false)
const loginFromRef = ref(null)
const passwordType = ref('password')

// 数据源
const loginForm = ref({
  account: '',
  password: ''
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

.login-view {
  height: 100vh;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  background-color: var(--qz-admin-bg-color);

  .el-row {
    height: 100%;
  }
  ::v-deep .el-card__body {
    padding: 0 !important;
  }
  .login-container {
    display: flex;
    justify-content: center;
    height: 600px;
    background-image: url(~@/assets/login.svg);
    background-size: cover;
    background-repeat: no-repeat;
    .login-bg {
      flex: 2;
      background-color: red;
    }
    .login-form {
      flex: 3;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 30px 10px;
      box-sizing: border-box;
      .form-container {
        width: 70%;
        padding: 30px 20px;
        border-radius: 6px;
        .title-container {
          position: relative;
          .title {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 42px;
            padding-bottom: 42px;
            text-align: center;
            font-weight: bold;
            &::before {
              content: '';
              display: inline-block;
              width: 42px;
              height: 42px;
              margin-right: 20px;
              background-image: url(~@/assets/logo.png);
              background-repeat: no-repeat;
              background-position: center;
              background-size: contain;
            }
          }
        }
        ::v-deep .el-form-item {
          position: relative;
          border: 1px solid #dcdfe6;
          border-radius: 5px;
          color: #454545;
            .icon {
              display: inline-block;
              margin-top: -4px;
              padding-left: 12px;
              color: #dcdfe6;
              vertical-align: middle;
            }
            .show-pwd {
              position: absolute;
              right: 10px;
              top: 7px;
              font-size: 16px;
              color: #889aa4;
              cursor: pointer;
              user-select: none;
            }
        }

        ::v-deep .el-input {
          display: inline-block;
          height: 47px;
          width: 85%;
          .el-form-item__error {
            padding-top: 12px;
          }

          input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: #dcdfe6;
            height: 47px;
            color: #dcdfe6;
          }
        }
      }

    }
  }
}
</style>
