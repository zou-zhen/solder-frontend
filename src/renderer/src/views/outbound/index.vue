<template>
  <div class="outbound-panel">
    <div class="store-out-panel">
      <div class="form-item">
        <span class="label">型号：</span>
        <el-select v-model="curModel" size="large" class="selector">
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
        <el-input v-model.number="storeOutNum" size="large"></el-input>
      </div>
      <div class="form-item">
        <el-button type="primary" size="large" @click="handleoutSolder">取出</el-button>
      </div>
      <!-- <div class="form-item">
        <span style="color: blue">自动搅拌</span>
      </div> -->
    </div>
    <div style="padding: 20px">
      <div style="font-weight: bold">可以取出的锡膏列表</div>
      <el-table v-model="outLoading" :data="outList" stripe max-height="500">
        <el-table-column prop="SolderCode" label="锡膏码" width="180" />
        <el-table-column prop="Model" label="型号" />
        <el-table-column prop="Station" label="区域" />
        <el-table-column prop="StorageDateTime" label="入柜时间" />
        <el-table-column prop="StorageUser" label="入柜人" />
      </el-table>
      <div style="font-weight: bold; margin-top: 20px">待取出的锡膏列表</div>
      <el-table v-model="daiquLoading" :data="daiquList" stripe max-height="500">
        <el-table-column prop="SolderCode" label="锡膏码" width="180" />
        <el-table-column prop="Model" label="型号" />
        <el-table-column prop="Station" label="区域" />
        <el-table-column prop="StorageDateTime" label="入柜时间" />
        <el-table-column prop="StorageUser" label="入柜人" />
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
import outboundApi from '@renderer/api/outbound/index'
import reservationApi from '@renderer/api/reservation/index'
import { ElMessage } from 'element-plus'

const modelOptions = ref<{ label: string; value: string }[]>([])
const curModel = ref('')
const daiquLoading = ref(true)
const daiquList = ref([])
const outLoading = ref(true)
const outList = ref([])

const getDaiquList = () => {
  daiquLoading.value = true
  outboundApi
    .getDaiquSolder()
    .then((res: any) => {
      daiquLoading.value = false
      if (res.code === 0) {
        daiquList.value = res.data
      }
    })
    .catch((err) => {
      daiquLoading.value = false
      console.log(err)
    })
}
//可取出的列表
const getAccessibleList = () => {
  outLoading.value = true
  outboundApi
    .getAccessibleSolder()
    .then((res: any) => {
      outLoading.value = false
      if (res.code === 0) {
        outList.value = res.data
      }
    })
    .catch((err) => {
      outLoading.value = false
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
        curModel.value = modelOptions.value[0]?.value || ''
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

const handleoutSolder = () => {
  outboundApi
    .outSolder({ model_type: curModel.value, amount: storeOutNum.value })
    .then((res: any) => {
      if (res.code === 0) {
        ElMessage({
          message: '取出成功',
          type: 'success',
          duration: 3000 // 显示时长，默认3000ms
        })
        getDaiquList()
        getAccessibleList()
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

getDaiquList()
getAccessibleList()
getSolderModelList()

const storeOutNum = ref(null)
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
