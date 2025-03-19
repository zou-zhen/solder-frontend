<template>
  <div class="outbound-panel">
    <div class="store-out-panel">
      <div class="form-item">
        <el-input v-model="storeOutNum" size="large"></el-input>
        <el-button type="primary" size="large">销码</el-button>
      </div>
    </div>
    <div class="store-out-panel">
      <div class="form-item">
        <el-radio-group v-model="radio1">
          <el-radio value="1" size="large">出库日期</el-radio>
          <el-radio value="2" size="large">销码日期</el-radio>
        </el-radio-group>
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
        />
      </div>
      <div class="form-item">
        <span class="label">未销码：</span>
        <el-switch v-model="value2" />
      </div>
      <div class="form-item">
        <el-button type="primary" size="large">查询</el-button>
      </div>
    </div>
    <div style="padding: 20px">
      <div style="font-weight: bold">已销码列表</div>
      <el-table :data="tableData" stripe max-height="650">
        <el-table-column prop="date" label="锡膏码" width="180" />
        <el-table-column prop="name" label="型号" width="180" />
        <el-table-column prop="address" label="入柜人" />
        <el-table-column prop="address" label="入柜时间" />
        <el-table-column prop="address" label="使用人" />
        <el-table-column prop="address" label="领用时间" />
        <el-table-column prop="address" label="是否销码" />
        <el-table-column prop="address" label="销码人" />
        <el-table-column prop="address" label="销码时间" />
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

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]

const value1 = ref<[Date, Date]>([new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)])
const value2 = ref(true)
const radio1 = ref('1')
const storeOutNum = ref(null)

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
