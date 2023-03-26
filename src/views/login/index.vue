<template>
  <div class="login-view">
    <el-row justify="center" align="middle">
      <el-col :md="22" :lg="20" :xs="24" :sm="24">
        <el-card>
          <div class="login-container">
            <div class="login-bg" v-if="!$store.getters.isMobile"></div>
            <div class="login-form">
              <div class="option">
                <switch-dark></switch-dark>
              </div>
              <el-row justify="center" align="middle">
                <el-col :md="16" :lg="16" :xs="23" :sm="23">
                  <el-form
                    class="form-container"
                    :model="loginForm"
                    :rules="loginRules"
                    ref="loginFromRef"
                  >
                    <div class="title-container">
                      <h3 class="title">{{ config.project }}</h3>
                    </div>
                    <el-form-item prop="account">
                      <span class="icon">
                        <svg-icon icon="user"></svg-icon>
                      </span>
                      <el-input
                        :placeholder="$t('msg.login.usernamePlaceholder')"
                        name="account"
                        type="text"
                        v-model="loginForm.account"
                      >
                      </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                      <span class="icon">
                        <svg-icon icon="password"></svg-icon>
                      </span>
                      <span class="show-pwd" @click="onChangePwdType">
                        <svg-icon
                          :icon="
                            passwordType == 'password' ? 'eye' : 'eye-open'
                          "
                        ></svg-icon>
                      </span>
                      <el-input
                        :placeholder="$t('msg.login.passwordPlaceholder')"
                        name="password"
                        :type="passwordType"
                        v-model="loginForm.password"
                      ></el-input>
                    </el-form-item>
                    <div class="btn-group">
                      <el-button
                        type="primary"
                        round
                        style=""
                        @click="loginBtn"
                        >{{ $t('msg.login.loginBtn') }}</el-button
                      >
                    </div>
                  </el-form>
                  <el-divider></el-divider>
                  <div class="auth-btn">
                    <el-button
                      type="success"
                      size="small"
                      plain
                      @click="adminLoginBtn"
                      >{{ $t('msg.login.adminBtn') }}</el-button
                    >
                    <el-button
                      type="warning"
                      size="small"
                      plain
                      @click="userLoginBtn"
                      >{{ $t('msg.login.userBtn') }}</el-button
                    >
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
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { login } from '@/api/user'
import { ElMessage, ElNotification } from 'element-plus'
import SwitchDark from '@/components/SwitchDark'
import { validatePassword } from './rules'
import { PAGE } from '@/constant'
import config from '@/setting'

const i18n = useI18n()
const router = useRouter()
const loginFromRef = ref(null)
const passwordType = ref('password')

// 数据源
const loginForm = reactive({
  account: '',
  password: ''
})

// 校验规则
const loginRules = ref({
  account: [
    {
      required: true,
      trigger: 'blur',
      message: i18n.t('msg.login.accountRule')
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword(i18n.t('msg.login.passwordRule'))
    }
  ]
})

const handleLogin = (loginForm) => {
  login(loginForm).then((res) => {
    if (res.errorno === 0) {
      ElNotification({
        title: i18n.t('msg.login.loginsuccess'),
        message: `${i18n.t('msg.login.welcomeTo')} ${config.project} ${i18n.t(
          'msg.login.system'
        )}`,
        type: 'success',
        duration: 1500
      })
      router.push(PAGE)
    } else {
      ElMessage.error(res.message)
    }
  })
}

const loginBtn = () => {
  loginFromRef.value.validate((valid) => {
    if (!valid) return
    handleLogin(loginForm)
  })
}

const adminLoginBtn = () => {
  handleLogin({
    account: 'admin',
    password: '123456'
  })
}

const userLoginBtn = () => {
  handleLogin({
    account: 'user',
    password: '123456'
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
    height: 690px;
    .login-bg {
      flex: 2;
      background-image: url(~@/assets/loginbg.jpg);
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
          margin-bottom: 29px !important;
          .el-form-item__content {
            display: block !important;
            position: relative;
            .el-form-item__error {
              padding-top: 12px;
            }
            .el-input {
              display: inline-block;
              height: 47px;
              width: 100%;
              .el-input__wrapper {
                width: 100%;
              }
              .el-input__inner {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 18px;
                color: #dcdfe6;
                height: 47px;
                color: #dcdfe6;
              }
            }
            .icon {
              position: absolute;
              top: 0;
              bottom: 0;
              left: 10px;
              line-height: 47px;
              color: #dcdfe6;
              z-index: 100;
            }

            .show-pwd {
              position: absolute;
              right: 10px;
              top: 7px;
              font-size: 16px;
              color: #889aa4;
              cursor: pointer;
              user-select: none;
              z-index: 100;
            }
          }
        }
        .btn-group {
          .el-button {
            width: 100%;
            margin-top: 15px;
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
