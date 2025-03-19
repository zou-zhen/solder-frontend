<template>
  <div class="outbound-panel">
    <div class="store-out-panel">
      <div class="form-item">
        <span class="label">型号：</span>
        <el-select v-model="curModel" placeholder="Select" size="large" class="selector">
          <el-option
            v-for="item in modelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="form-item">
        <span class="label">数量：</span>
        <el-input v-model="storeOutNum" size="large"></el-input>
      </div>
      <div class="form-item">
        <el-date-picker
          v-model="curSettingTime"
          type="datetime"
          placeholder="Select date and time"
          size="large"
          value-format="YYYY-MM-DD HH:mm:ss"
          format="YYYY-MM-DD HH:mm:ss"
        />
      </div>
      <div class="form-item">
        <el-button type="primary" size="large" @click="handleOrder">锡膏预约</el-button>
      </div>
      <div class="form-item">
        <span class="label">开工时间：</span>
        <el-date-picker
          v-model="curSettingTime"
          type="datetime"
          placeholder="Select date and time"
          size="large"
          value-format="YYYY-MM-DD HH:mm:ss"
          format="YYYY-MM-DD HH:mm:ss"
        />
      </div>
      <div class="form-item">
        <el-button type="primary" size="large" @click="handleOrderMode">开工预约</el-button>
      </div>
    </div>

    <div style="padding: 20px">
      <div style="font-weight: bold">可以预约的锡膏列表</div>
      <el-table v-loading="loadingUnorder" :data="unOrderList" stripe max-height="500">
        <el-table-column prop="solder_code" label="锡膏码" width="180" />
        <el-table-column prop="model" label="型号" />
        <el-table-column prop="expire_date" label="到期日期" />
        <el-table-column prop="storage_datetime" label="入柜时间" />
        <el-table-column prop="current_flow" label="当前流程" />
        <el-table-column prop="order_user" label="预约人" />
        <el-table-column prop="order_datetime" label="预约时间" />
      </el-table>
      <div style="font-weight: bold; margin-top: 20px">已经预约的锡膏列表</div>
      <el-table v-loading="loadingOrder" :data="orderList" stripe max-height="500">
        <el-table-column prop="solder_code" label="锡膏码" width="180" />
        <el-table-column prop="model" label="型号" />
        <el-table-column prop="expire_date" label="到期日期" />
        <el-table-column prop="storage_datetime" label="入柜时间" />
        <el-table-column prop="current_flow" label="当前流程" />
        <el-table-column prop="order_user" label="预约人" />
        <el-table-column prop="order_datetime" label="预约时间" />
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
import reservationApi from '@renderer/api/reservation/index'
import { ElMessage } from 'element-plus'

const modelOptions = ref<{ label: string; value: string }[]>([])

const curModel = ref('')
const storeOutNum = ref(1)
const curSettingTime = ref('')

const loadingOrder = ref(true)
const loadingUnorder = ref(true)
const orderList = ref([])
const unOrderList = ref([])

const getOrderList = () => {
  loadingOrder.value = true
  reservationApi
    .getOrderedSolder()
    .then((res: any) => {
      loadingOrder.value = false
      if (res.code === 0) {
        orderList.value = res.data
      }
    })
    .catch((err) => {
      loadingOrder.value = false
      console.log(err)
    })
}

const getUnorderList = () => {
  loadingUnorder.value = true
  reservationApi
    .getUnorderedSolder()
    .then((res: any) => {
      loadingUnorder.value = false
      if (res.code === 0) {
        unOrderList.value = res.data
      }
    })
    .catch((err) => {
      loadingUnorder.value = false
      console.log(err)
    })
}

const getSolderModelList = () => {
  reservationApi
    .getSolderModelsType()
    .then((res: any) => {
      if (res.code === 0) {
        modelOptions.value = res.data.map((item: string) => {
          return { label: item, value: item }
        })
      } else {
        ElMessage({
          message: res.data,
          type: 'error',
          duration: 3000 // 显示时长，默认3000ms
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
const handleOrderMode = () => {
  reservationApi
    .orderMode({
      OrderDateTime: curSettingTime.value
    })
    .then((res: any) => {
      if (res.code === 0) {
        ElMessage({
          message: '预约成功',
          type: 'success',
          duration: 3000 // 显示时长，默认3000ms
        })
      } else {
        ElMessage({
          message: res.data,
          type: 'error',
          duration: 3000 // 显示时长，默认3000ms
        })
      }
    })
}
const handleOrder = () => {
  reservationApi
    .orderSolder({
      model: curModel.value,
      amount: storeOutNum.value,
      OrderDateTime: curSettingTime.value
    })
    .then((res: any) => {
      if (res.code === 0) {
        ElMessage({
          message: '预约成功',
          type: 'success',
          duration: 3000 // 显示时长，默认3000ms
        })
        getOrderList()
        getUnorderList()
        getSolderModelList()
      } else {
        ElMessage({
          message: res.data,
          type: 'error',
          duration: 3000 // 显示时长，默认3000ms
        })
      }
    })
}

getOrderList()
getUnorderList()
getSolderModelList()

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
