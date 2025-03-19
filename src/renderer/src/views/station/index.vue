<template>
  <div class="outbound-panel">
    <div class="store-out-panel">
      <div class="box2">
        <div class="control-button" type="primary"></div>
        <div class="control-button">
          <div class="control-item">
            <i class="iconfont icon-cujiantou"></i>
            <span class="center-text">X+</span>
          </div>
        </div>
        <div class="control-button" type="primary"></div>
        <div class="control-button">
          <div class="control-item">
            <i class="iconfont icon-cujiantou"></i>
            <span class="center-text">Z+</span>
          </div>
        </div>
        <div class="control-button">
          <div class="control-item">
            <i class="iconfont icon-xuanzhuan-1"></i>
            <span class="center-text" style="color: #007bff">R+</span>
          </div>
        </div>
        <div class="control-button">
          <div class="control-item">
            <i class="iconfont icon-cujiantou-left-copy"></i>
            <span class="center-text">Y-</span>
          </div>
        </div>
        <div class="control-button">
          <div class="control-item">
            <i class="iconfont icon-cujiantou-below"></i>
            <span class="center-text">X-</span>
          </div>
        </div>
        <div class="control-button">
          <div class="control-item">
            <i class="iconfont icon-cujiantou-right-copy"></i>
            <span class="center-text">Y+</span>
          </div>
        </div>
        <div class="control-button">
          <div class="control-item">
            <i class="iconfont icon-cujiantou-below"></i>
            <span class="center-text">Z-</span>
          </div>
        </div>
        <div class="control-button">
          <div class="control-item">
            <i class="iconfont icon-xuanzhuan-2"></i>
            <span class="center-text" style="color: #007bff">R-</span>
          </div>
        </div>

        <!-- <el-button class="control-button" type="primary">X+</el-button>
        <div class="control-button" type="primary"></div>
        <el-button class="control-button" type="primary">Z+</el-button>
        <el-button class="control-button" type="primary">R+</el-button>
        <el-button class="control-button" type="primary">Y-</el-button>
        <el-button class="control-button" type="primary">X-</el-button>
        <el-button class="control-button" type="primary">Y+</el-button>
        <el-button class="control-button" type="primary">Z-</el-button>
        <el-button class="control-button" type="primary">R-</el-button> -->
      </div>
    </div>
    <div style="padding: 20px">
      <el-table v-loading="loading" :data="stationList" stripe height="450">
        <el-table-column prop="StationID" label="工位" width="180" />
        <el-table-column prop="StaArea" label="区域" width="180" />
        <el-table-column prop="XAxis" label="X轴坐标" />
        <el-table-column prop="YAxis" label="Y轴坐标" />
        <el-table-column prop="ZAxis" label="Z轴坐标" />
        <el-table-column prop="RAxis" label="R轴坐标" />
        <el-table-column label="Operations" min-width="120">
          <template #default>
            <el-button type="primary" size="default" @click="handleClick"> 点位读取 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <!-- <div class="right-back">
    <el-button type="primary" class="grid-button" @click="goBack">返回上一页</el-button>
    <el-button type="primary" class="grid-button" @click="goHome">返回主页</el-button>
  </div> -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '../../router/index'
import stationApi from '@renderer/api/station/index'

const loading = ref(true)
const stationList = ref([])
// 用于保存当前点击的行的id
const activeRowId = ref(null)

// 行点击事件
const handleRowClick = (row) => {
  activeRowId.value = row.id
}

// 根据当前点击的行决定行的样式
const getRowClassName = (row) => {
  return row.id === activeRowId.value ? 'active-row' : ''
}

// 点击按钮时变色
const changeRowColor = (row) => {
  activeRowId.value = row.id
}

const getList = () => {
  loading.value = true
  stationApi
    .getStation()
    .then((res: any) => {
      loading.value = false
      if (res.code === 0) {
        stationList.value = res.data
      }
    })
    .catch((err) => {
      loading.value = false
      console.log(err)
    })
}

getList()

const handleClick = () => {
  console.log('click')
}

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push('/home')
}
</script>

<style scoped lang="scss">
.outbound-panel {
  background-color: white;
  height: 100%;
}

.store-out-panel {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
  gap: 20px; /* 项目之间的间距 */
}

.box2 {
  width: 50%;
  height: 50%;
  // border: 1px solid grey;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 2fr 2fr;
  gap: 25px;
  padding: 10px;
  box-sizing: border-box;

  .control-button {
    width: 100%;
    height: 100%;
    font-size: 24px;
    text-align: center;

    .control-item {
      position: relative;
      display: inline-block;
      width: 80px; /* 设置图标容器大小 */
      height: 50px; /* 确保宽高一致以便居中 */
      text-align: center;
    }

    .control-item i {
      font-size: 80px; /* 图标大小 */
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      line-height: 50px; /* 水平居中辅助 */
      z-index: 1; /* 图标在底部 */
      color: #409eff;
    }

    .control-item .center-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%); /* 将文字居中 */
      z-index: 2; /* 确保文字在图标上方 */
      color: white; /* 根据需求设置文字颜色，与图标对比清晰 */
      font-size: 14px; /* 设置文字大小 */
      font-weight: bold; /* 文字加粗，便于识别 */
      pointer-events: none; /* 禁止文字接收点击事件，避免影响图标 */
    }
  }
}

.arrow-button {
  position: relative;
  width: 60px;
  height: 60px;
  background-color: #409eff;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

/* 向上的箭头 */
.arrow-button.up {
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
}

/* 向下的箭头 */
.arrow-button.down {
  clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
}

/* 向左的箭头 */
.arrow-button.left {
  clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
}

/* 向右的箭头 */
.arrow-button.right {
  clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
}

/* 调整按钮内的文字 */
.arrow-button span {
  position: absolute;
  font-size: 12px;
  line-height: 12px;
  transform: translateY(20px); /* 如果需要微调文字位置 */
}

.grid-button {
  flex: 0 0 calc(50% - 40px); /* 每个按钮占50%的宽度，并减去间距 */
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
  z-index: 999;
}

.el-button {
  margin: 0;
}
</style>
