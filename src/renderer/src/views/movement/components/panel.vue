<template>
  <el-card style="max-width: 350px">
    <span class="sub-title">X--轴号：0</span>
    <div class="panel-item">
      <el-tag type="primary">轴连接</el-tag>
      <el-tag type="primary">轴使能</el-tag>
      <el-tag type="primary">轴报警</el-tag>
      <el-tag type="primary">已回零</el-tag>
    </div>
    <div class="panel-item">
      <el-tag type="primary">在原点</el-tag>
      <el-tag type="primary">正限位</el-tag>
      <el-tag type="primary">负限位</el-tag>
      <el-tag type="primary">运动中</el-tag>
    </div>
    <div class="panel-item">
      <span> 轴状态机： 操作使能状态 轴报警码 </span>

      <el-button type="primary">清除</el-button>
    </div>
    <div class="panel-item">
      <span>当前位置</span>
      <el-input style="width: 70px"></el-input>
      <span>当前速度</span>
      <el-input style="width: 70px"></el-input>
    </div>
    <div class="panel-item">
      <el-radio-group v-model="radio1">
        <el-radio value="1" size="large">连续点动</el-radio>
        <el-radio value="2" size="large">步距点动</el-radio>
      </el-radio-group>
      <el-input style="width: 70px"></el-input>
    </div>
    <div class="panel-item">
      <el-slider v-model="value" show-input />
    </div>
    <div class="panel-item">
      <div>
        <span>运行到</span>
        <el-input style="width: 70px; margin-left: 5px"></el-input>
      </div>
      <div>
        <el-button type="primary">回零</el-button>
        <el-button type="primary" style="margin-left: 5px">停止</el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const radio1 = ref('1')
</script>

<style scoped lang="scss">
.panel-item {
  display: flex;
  gap: 5px;
  margin-bottom: 5px;
  justify-content: space-between;
  align-items: center;
}
</style>
