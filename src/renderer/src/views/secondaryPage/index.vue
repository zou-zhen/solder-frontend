<template>
  <div class="home">
    <div class="button-grid">
      <el-button type="primary" class="grid-button" @click="router.push('/modelManagement')"
        >型号管理</el-button
      >
      <el-button type="primary" class="grid-button" @click="router.push('/alert')"
        >报警记录</el-button
      >
      <el-button type="primary" class="grid-button" @click="router.push('/dataLog')"
        >数据记录</el-button
      >
      <!-- <el-button type="primary" class="grid-button" @click="onJumpSetting">设置</el-button> -->
    </div>

    <div class="right-back">
      <el-button type="primary" class="grid-button" @click="goBack">返回上一页</el-button>
      <el-button type="primary" class="grid-button" @click="goHome">返回主页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '../../router/index'

/// 返回上一页
const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push('/home')
}

// const onJumpSetting = () => {
//   router.push('/setting')
// }
</script>

<style scoped lang="scss">
.home {
  display: flex; /* 启用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100%; /* 占满整个视口高度 */
  background-color: #f9f7f7; /* 背景色 */
}

.button-grid {
  display: flex; /* 启用 Flexbox 布局 */
  flex-wrap: wrap; /* 允许换行 */
  justify-content: center; /* 每行水平居中 */
  gap: 40px; /* 按钮间距 */
  width: 600px; /* 控制网格总宽度，适应两行 */
}

.grid-button {
  flex: 0 0 calc(30% - 40px); /* 每个按钮占50%的宽度，并减去间距 */
  height: 80px; /* 按钮高度 */
  font-size: 18px; /* 按钮字体大小 */
  text-align: center; /* 按钮文本居中 */
}

.right-back {
  position: fixed; /* 固定在页面右侧 */
  top: 80%; /* 垂直居中 */
  right: 20px; /* 距离右边界 20px */
  transform: translateY(-50%); /* 修正垂直居中的偏移 */
  display: flex; /* 启用 Flexbox 布局 */
  flex-direction: column; /* 图标垂直排列 */
  gap: 15px; /* 图标之间的间距 */
}

.el-button {
  margin: 0;
}
</style>
