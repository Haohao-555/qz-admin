<template>
  <div class="login-view">
    <el-row justify="center" align="middle">
      <el-col :md="22" :lg="20" :xs="24" :sm="24">
        <el-card>
          <div class="login-container">
            <div class="login-bg" v-if="!$store.getters.isMobile"></div>
            <div class="login-form">
              <div class="option">
                <lang-select class="lang-select"></lang-select>
                <switch-dark></switch-dark>
              </div>
              <el-row justify="center" align="middle">
                 <el-col :md="16" :lg="16" :xs="23" :sm="23">
                  <el-form class="form-container" :model="loginForm" :rules="loginRules" ref="loginFromRef">
                    <div class="title-container">
                      <h3 class="title">{{ config.project }}</h3>
                    </div>
                    <el-form-item prop="account">
                      <span class="icon">
                        <svg-icon icon="user"></svg-icon>
                      </span>
                      <el-input :placeholder="$t('msg.login.usernameRule')" name="account" type="text" v-model="loginForm.account"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                      <span class="icon">
                        <svg-icon icon="password"></svg-icon>
                      </span>
                      <span class="show-pwd" @click="onChangePwdType">
                        <svg-icon :icon="passwordType == 'password' ? 'eye' : 'eye-open'"></svg-icon>
                      </span>
                      <el-input :placeholder="$t('msg.login.passwordRule')" name="password" :type="passwordType" v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <div class="btn-group">
                      <el-button type="primary" round :loading="loading" style="width:100%; margin-top: 15px;" @click="handleLogin">{{ $t('msg.login.loginBtn') }}</el-button>
                    </div>
                  </el-form>
                  <el-divider></el-divider>
                  <div class="auth-btn">
                    <el-button type="success" size="small" plain @click="adminLogin">{{ $t('msg.login.adminBtn') }}</el-button>
                    <el-button type="warning" size="small" plain @click="userLogin">{{ $t('msg.login.userBtn') }}</el-button>
                  </div>
                 </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { validatePassword } from './rules.js'
import SwitchDark from '@/components/SwitchDark'
import LangSelect from '@/components/LangSelect'
import config from '@/setting'
const store = useStore()

const loading = ref(false)
const loginFromRef = ref(null)
const passwordType = ref('password')

// 数据源
// 39436
// 3347
const loginForm = reactive({
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
    store.dispatch('user/login', loginForm).then(() => {
      loading.value = false
    }).catch(err => {
      console.log(err)
      loading.value = false
    })
  })
}

const adminLogin = () => {
  loginForm.account = 'admin'
  loginForm.password = '123456'
  handleLogin()
}

const userLogin = () => {
  loginForm.account = 'user'
  loginForm.password = '123456'
  handleLogin()
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
    height: 690px;
    .login-bg {
      flex: 2;
      background-image: url(~@/assets/loginbg.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
    .login-form {
      position: relative;
      flex: 3;
      background-image: url(~@/assets/login.svg);
      background-size: cover;
      background-repeat: no-repeat;
      .option {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 24px;
        z-index: 100;
        .lang-select {
          font-size: 24px;
          padding-right: 12px;
        }
      }
      .form-container {
        width: 100%;
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
      .auth-btn {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
