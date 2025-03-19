<template>
  <div class="home">
    <div class="panel">
      <div class="function-area">
        <div class="function-item">
          <i class="iconfont icon-yonghu"></i>
          <span>用户管理</span>
        </div>
        <div class="function-item">
          <i class="iconfont icon-yonghu"></i>
          <span>用户管理</span>
        </div>
        <div class="function-item">
          <i class="iconfont icon-yonghu"></i>
          <span>用户管理</span>
        </div>
        <div class="function-item">
          <i class="iconfont icon-yonghu"></i>
          <span>用户管理</span>
        </div>
        <div class="function-item">
          <i class="iconfont icon-yonghu"></i>
          <span>用户管理</span>
        </div>
      </div>
      <div class="function-area">
        <div class="function-item">
          <i class="iconfont icon-yonghu"></i>
          <span>用户管理</span>
        </div>
        <div class="function-item">
          <i class="iconfont icon-yonghu"></i>
          <span>用户管理</span>
        </div>
        <div class="function-item">
          <i class="iconfont icon-yonghu"></i>
          <span>用户管理</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.home {
  display: flex; /* 启用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100%; /* 占满视口高度 */
  // background-color: rgb(113, 110, 110); /* 设置背景色以便测试 */
  background-color: white;
}

.panel {
  width: 85%;
  height: 85%;
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20%;

  .function-area {
    width: 100%;
    display: flex;
    gap: 10%;

    .function-item {
      border: 1px solid #007bff;
      border-radius: 10px;
      background-color: #4997eb;
      padding: 2px;
      width: 8%;
      display: flex;
      flex-direction: column;
      align-items: center; /* 居中对齐 */
      text-align: center; /* 文字居中 */
      gap: 10px;
      color: white;

      i {
        font-size: 30px;
      }
    }
  }
}
</style>
