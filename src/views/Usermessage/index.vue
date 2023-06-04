<template>
  <div class="user-message">
    <div class="ava">
      <el-avatar :size="60" :src="userInfo.avatar" class="ava-img" />
      <div class="info">
        <span>{{ userInfo.account }}</span>
        <el-button type="primary" size="small" @click="upload_ava">{{
          $t('msg.userMessage.uploadAva')
        }}</el-button>
      </div>
    </div>
    <el-form :model="form" label-width="80px">
      <el-form-item :label="$t('msg.userManage.nickname')">
        <el-input v-model="form.nickName" :disabled="form.disabled" />
      </el-form-item>
      <el-form-item :label="$t('msg.userManage.city')">
        <el-input v-model="form.city" :disabled="form.disabled" />
      </el-form-item>
      <el-form-item :label="$t('msg.userManage.email')">
        <el-input v-model="form.email" :disabled="form.disabled" />
      </el-form-item>
      <el-form-item :label="$t('msg.userManage.idcard')">
        <el-input v-model="form.idcard" :disabled="form.disabled" />
      </el-form-item>
      <el-form-item :label="$t('msg.userManage.gender')">
        <el-select v-model="form.gender" :disabled="form.disabled">
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
          <el-option label="保密" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('msg.userManage.age')">
        <el-input v-model="form.age" :disabled="form.disabled" />
      </el-form-item>
      <el-form-item :label="$t('msg.userManage.intriduce')">
        <el-input
          v-model="form.intriduce"
          type="textarea"
          :disabled="form.disabled"
        />
      </el-form-item>
      <el-form-item :label="$t('msg.userManage.role')">
        <el-tag style="cursor: not-allowed">{{
          form.authId == '1' ? '管理员' : '普通用户'
        }}</el-tag>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onEdit">编辑</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
const store = useStore()

const userInfo = store.getters.userInfo

const form = reactive({
  disabled: true,
  nickName: '',
  age: '',
  city: '',
  email: '',
  gender: '',
  intriduce: '',
  idcard: '',
  authId: ''
})

onMounted(() => {
  form.nickName = userInfo.nickName
  form.gender = userInfo.gender + ''
  form.intriduce = userInfo.intriduce
  form.city = userInfo.city
  form.email = userInfo.email
  form.idcard = userInfo.idcard + ''
  form.authId = userInfo.authId + ''
  form.age = userInfo.age + ''
})

const onSubmit = () => {
  form.disabled = true
  ElMessage('开发中')
}

const onEdit = () => {
  form.disabled = false
}

const upload_ava = () => {
  ElMessage('开发中')
}
</script>
<style lang="scss" scoped>
.user-message {
  padding: 10px;
  box-sizing: border-box;
  .ava {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    margin-left: 75px;
    .info {
      display: flex;
      flex-direction: column;
      span {
        margin-bottom: 12px;
      }
    }
    .ava-img {
      margin-right: 10px;
    }
  }
}
</style>
