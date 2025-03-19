<template>
  <div class="outbound-panel">
    <div class="store-out-panel">
      <!-- <div class="form-item">
        <span class="label">状态：</span>
        <el-select v-model="value" placeholder="Select" size="large" class="selector">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div> -->
      <div class="form-item">
        <span class="label">型号：</span>
        <el-select v-model="curModel" placeholder="请选择" size="large" class="selector" clearable>
          <el-option
            v-for="item in modelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="form-item">
        <span class="label">当前流程：</span>
        <el-select
          v-model="curProcess"
          placeholder="请选择"
          size="large"
          class="selector"
          clearable
        >
          <el-option
            v-for="item in processOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <div class="form-item">
        <el-button type="primary" size="large" @click="handleQuery">查询</el-button>
        <el-button type="primary" size="large" @click="handelQueryReset">重置</el-button>
      </div>
    </div>
    <div style="padding: 20px">
      <el-table v-loading="loading" :data="inventoryList" stripe max-height="800">
        <!-- <el-table-column prop="StationID" label="序号" /> -->
        <el-table-column prop="SolderCode" label="锡膏码" />
        <el-table-column prop="Model" label="型号" />
        <el-table-column
          prop="MesError"
          label="异常信息"
          :filters="[{ text: '只看异常', value: true }]"
          :filter-method="filterError"
        />
        <el-table-column prop="StationID" label="所在工位" />
        <el-table-column prop="StaArea" label="所在区域" />
        <!-- <el-table-column prop="address" label="到期日期" /> -->
        <el-table-column prop="StorageUser" label="入柜人" />
        <el-table-column prop="StorageDateTime" label="入柜时间" />
        <el-table-column prop="OrderUser" label="预约人" />
        <el-table-column prop="OutDateTime" label="预约时间" />
        <el-table-column prop="RewarmStartDateTime" label="回温开始时间" />
        <el-table-column prop="RewarmEndDateTime" label="回温结束时间" />
        <el-table-column prop="StirStartDateTime" label="搅拌开始时间" />
        <!-- <el-table-column prop="address" label="搅拌结束时间" /> -->
        <el-table-column fixed="right" label="操作" min-width="120">
          <template #default="scope">
            <el-button
              v-if="scope.row.StaArea === '冷藏区'"
              type="primary"
              size="large"
              @click="handleTakeOut(scope.$index, scope.row)"
              >取出</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import inventoryApi, { queryType } from '@renderer/api/inventory/index'
import reservationApi from '@renderer/api/reservation/index'
import { ElMessage } from 'element-plus'

const processOptions = ref([
  {
    label: '全部',
    value: ''
  },
  {
    label: '回温区',
    value: '回温区'
  },
  {
    label: '冷藏区',
    value: '冷藏区'
  },
  {
    label: '待取区',
    value: '待取区'
  }
])

const modelOptions = ref<{ label: string; value: string }[]>([])

const loading = ref(true)
const inventoryList = ref([])
const curProcess = ref('')
const curModel = ref('')

// 自定义过滤方法
const filterError = (value, row) => {
  if (value) {
    return row.MesError !== null && row.MesError !== ''
  }
  return true
}

const getList = (params: queryType = { model: '', StaArea: '' }) => {
  loading.value = true
  inventoryApi
    .getSolder(params)
    .then((res: any) => {
      loading.value = false
      if (res.code === 0) {
        inventoryList.value = res.data
      }
    })
    .catch((err) => {
      loading.value = false
      console.log(err)
    })
}

const handleQuery = () => {
  getList({ StaArea: curProcess.value, model: curModel.value })
}

const handelQueryReset = () => {
  curProcess.value = ''
  curModel.value = ''
}

const getSolderModelList = () => {
  // inventoryApi
  //   .getSolderModelList()
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

const handleTakeOut = (_index: number, row) => {
  inventoryApi.outSolder({ solder_code: row.SolderCode }).then((res: any) => {
    if (res.code === 0) {
      ElMessage({
        message: '取出成功！',
        type: 'success',
        duration: 3000 // 显示时长，默认3000ms
      })
    } else {
      ElMessage({
        message: '取出失败',
        type: 'error',
        duration: 3000 // 显示时长，默认3000ms
      })
    }
    getList()
  })
}

getList()
getSolderModelList()
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

// .right-back {
//   position: fixed; /* 固定在页面右侧 */
//   top: 80%; /* 垂直居中 */
//   right: 20px; /* 距离右边界 20px */
//   transform: translateY(-50%); /* 修正垂直居中的偏移 */
//   display: flex; /* 启用 Flexbox 布局 */
//   flex-direction: column; /* 图标垂直排列 */
//   gap: 15px; /* 图标之间的间距 */
//   z-index: 999;
// }

.el-button {
  margin: 0;
}

.el-table {
  .el-table-filter {
    width: 400px !important; /* 设置宽度 */
    max-height: 300px !important; /* 设置高度 */
    overflow-y: auto; /* 如果内容过多，显示滚动条 */
  }
}

.el-popper {
  width: 200px;
}
</style>
