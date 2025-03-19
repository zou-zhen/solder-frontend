<template>
  <div class="outbound-panel">
    <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="锡膏记录" name="solder">
        <div class="store-out-panel">
          <div class="form-item">
            <span class="label">锡膏码：</span>
            <el-input v-model="solderQueryParams.solder_code" size="large" clearable></el-input>
          </div>
          <div class="form-item">
            <span class="label">工号：</span>
            <el-input v-model="solderQueryParams.user_id" size="large" clearable></el-input>
          </div>
          <div class="form-item">
            <span class="label">类型：</span>
            <el-select
              v-model="solderQueryParams.record_type"
              size="large"
              class="selector"
              clearable
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="store-out-panel">
          <div class="form-item" style="margin-left: 20px">
            <el-date-picker
              v-model="solderInterval"
              type="datetimerange"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
              size="large"
              value-format="YYYY-MM-DD"
              format="YYYY-MM-DD"
            />
          </div>
          <div class="form-item">
            <el-button type="primary" size="large" @click="handleSolderQuery">查询</el-button>
            <el-button type="primary" size="large" @click="handleSolderReset">重置</el-button>
          </div>
        </div>
        <div style="padding: 20px">
          <el-table v-loading="solderLoading" :data="solderRecordList" stripe max-height="800">
            <el-table-column prop="SolderCode" label="锡膏码" width="180" />
            <el-table-column prop="UserID" label="工号" width="180" />
            <el-table-column prop="UserName" label="用户" />
            <el-table-column prop="Type" label="类型" />
            <el-table-column prop="DateTime" label="时间" />
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="温度记录" name="temper">
        <div class="store-out-panel">
          <div class="form-item" style="margin-left: 20px">
            <el-date-picker
              v-model="temperInterval"
              type="datetimerange"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
              size="large"
              value-format="YYYY-MM-DD"
              format="YYYY-MM-DD"
            />
          </div>
          <div class="form-item">
            <el-button type="primary" size="large" @click="handleTemperQuery">查询</el-button>
          </div>
        </div>
        <div ref="chart" style="width: 100%; height: 600px"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
  <!-- <div class="right-back">
    <el-button type="primary" class="grid-button" @click="goBack">返回上一页</el-button>
    <el-button type="primary" class="grid-button" @click="goHome">返回主页</el-button>
  </div> -->
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import router from '../../router/index'
import recordApi from '@renderer/api/record/index'
import * as echarts from 'echarts'

const options = ref([
  {
    label: '入柜',
    value: '入柜'
  },
  {
    label: '出柜',
    value: '出柜'
  }
])

const temperLoading = ref(true)
const temperRecordList = ref([])
const temperInterval = ref([])
const solderLoading = ref(true)
const solderRecordList = ref([])
const solderInterval = ref([])
const solderQueryParams = ref({
  solder_code: '',
  user_id: null,
  record_type: ''
})
const chart = ref(null)
const activeName = ref('solder')

const handleTemperQuery = () => {
  // console.log('temperInterval', temperInterval)
  getTemperList()
}

const handleSolderQuery = () => {
  getSolderList()
}

const handleSolderReset = () => {
  solderQueryParams.value = {
    solder_code: '',
    user_id: null,
    record_type: ''
  }
  solderInterval.value = []
  getSolderList()
}

const getSolderList = () => {
  solderLoading.value = true
  recordApi
    .getSolderFlowRecords({
      start_date: solderInterval.value?.[0],
      end_date: solderInterval.value?.[1],
      solder_code: solderQueryParams.value.solder_code,
      user_id: solderQueryParams.value.user_id,
      record_type: solderQueryParams.value.record_type
    })
    .then((res: any) => {
      solderLoading.value = false
      if (res.code === 0) {
        solderRecordList.value = res.data
      }
    })
    .catch((err) => {
      solderLoading.value = false
      console.log(err)
    })
}

const getTemperList = () => {
  temperLoading.value = true
  recordApi
    .getTemperatureRecords({
      start_date: temperInterval.value?.[0] || '2000-01-01',
      end_date: temperInterval.value?.[1] || '2080-01-01'
    })
    .then((res: any) => {
      temperLoading.value = false
      if (res.code === 0) {
        temperRecordList.value = res.data
        initCharts()
      }
    })
    .catch((err) => {
      temperLoading.value = false
      console.log(err)
    })
}

const handleClick = (tab, event) => {
  console.log(tab, event)
}

const initCharts = () => {
  const chartInstance = echarts.init(chart.value)

  const option = {
    title: {
      text: '实时温度曲线',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['ColdTemperD', 'ColdTemperM', 'ColdTemperS', 'ReTemper'],
      bottom: 10, // 图例放在底部
      left: 'center' // 水平居中
    },
    xAxis: {
      type: 'category',
      data: temperRecordList.value.map((item) => item.DateTime)
    },
    yAxis: {
      type: 'value',
      name: 'Temperature (°C)',
      min: (value) => value.min - 2, // 动态设置最小值，略小于数据最小值
      max: (value) => value.max + 2 // 动态设置最大值，略大于数据最大值
    },
    dataZoom: [
      {
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'none'
      },
      {
        type: 'slider',
        yAxisIndex: 0,
        filterMode: 'none'
      },
      {
        type: 'inside',
        xAxisIndex: 0,
        filterMode: 'none'
      },
      {
        type: 'inside',
        yAxisIndex: 0,
        filterMode: 'none'
      }
    ],
    series: [
      {
        name: 'ColdTemperD',
        type: 'line',
        data: temperRecordList.value.map((item) => parseFloat(item.ColdTemperD))
      },
      {
        name: 'ColdTemperM',
        type: 'line',
        data: temperRecordList.value.map((item) => parseFloat(item.ColdTemperM))
      },
      {
        name: 'ColdTemperS',
        type: 'line',
        data: temperRecordList.value.map((item) => parseFloat(item.ColdTemperS))
      },
      {
        name: 'ReTemper',
        type: 'line',
        data: temperRecordList.value.map((item) => parseFloat(item.ReTemper))
      }
    ]
  }

  chartInstance.setOption(option)

  // 监听窗口大小调整
  window.addEventListener('resize', () => chartInstance.resize())
}

getSolderList()

onMounted(() => {})

watch(activeName, (newVal) => {
  if (newVal === 'solder') {
    getSolderList()
  } else {
    getTemperList()
  }
})

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push('/home')
}
</script>

<style lang="scss" scoped>
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
