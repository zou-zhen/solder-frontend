<template>
  <div>
    <GoBack></GoBack>
    <h1>测试本地模拟接口</h1>
    <el-button type="success" @click="handleGetUserInfo">获取用户信息</el-button>
  </div>
</template>

<script setup>
// import { getUserInfoApi } from '../../api/auth/user'
import GoBack from '@renderer/components/GoBack/index.vue'
import useUserStore from '@renderer/store/modules/user'

const userStore = useUserStore()

// 登录
function handleGetUserInfo() {
  // getUserInfoApi('xxaxxx').then((res: any) => {
  //   console.log(
  //     `用户信息响应：=> userId:${res?.data?.userId}, nickName: ${res?.data.nickName},age:${res?.data.nickName}}`
  //   )
  // })
  userStore.getInfo({ accessToken: 'xxaxxx' }).then((res) => {
    console.log('res', res)

    console.log(
      `用户信息响应：=> userId:${res?.data?.userId}, nickName: ${res?.data.nickName},age:${res?.data.nickName}}`
    )
  })
}
</script>

<style scoped></style>
