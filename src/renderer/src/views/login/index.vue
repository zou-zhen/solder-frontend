<template>
  <div>
    <el-container>
      <el-main style="display: flex; justify-content: center; align-items: center">
        <el-card class="login_card">
          <p style="font-size: 25px; font-weight: bold; text-align: center">登录</p>
          <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="账号：" prop="username">
              <el-input v-model="form.username" placeholder="请输入账号" />
            </el-form-item>
            <el-form-item label="密码：" prop="password">
              <el-input v-model="form.password" type="password" placeholder="请输入密码" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit()">登录</el-button>
              <el-button type="primary" @click="resetForm()">重置</el-button>
              <el-button type="primary" @click="onClickJump()">跳转</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
// import userApi from '../../api/auth/user'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import router from '../../router/index'
import useUserStore from '@renderer/store/modules/user'

const useStore = useUserStore()
const form = reactive({
  username: '',
  password: ''
})
const ruleFormRef = ref()
const rules = reactive({
  username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
})
const onSubmit = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await useStore.login(form)
      console.log('loginres', res)

      if (res.data) {
        if (res.code === '0') {
          console.log('11')

          router.push('/home')
        } else {
          ElMessage.error(res.data.message)
        }
      } else {
        ElMessage.error('发生错误')
      }
    } else {
      return false
    }
  })
}
const resetForm = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.resetFields()
}

const onClickJump = () => {
  router.push('/home')
}
</script>

<style scoped>
.el-header {
  height: 10%;
}

.el-main {
  height: 80%;
  background-repeat: no-repeat;
  background-size: 100% 120%;
  background-position-y: bottom;
}

.login_card {
  margin: 100px 200px;
  width: 40%;
  min-width: 300px;
  height: 300px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-footer {
  height: 10%;
  text-align: center;
}
</style>
