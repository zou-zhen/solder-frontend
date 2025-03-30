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
            <el-pagination
              v-model:current-page="solderQueryParams.page"
              v-model:page-size="solderQueryParams.page_size"
              :page-sizes="[10, 20, 50, 100]"
              :total="total"
              :page-size-opts="[10, 20, 50, 100]"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            >
              <template #total>
                共 {{ total }} 条
              </template>
              <template #sizes="{ item }">
                {{ item.value }} 条/页
              </template>
              <template #jumper>
                前往 <el-input v-model="solderQueryParams.page" /> 页
              </template>
            </el-pagination>
            <el-button type="primary" size="large" @click="handleSolderQuery">查询</el-button>
            <el-button type="primary" size="large" @click="handleSolderReset">重置</el-button>
          </div>
        </div>
        
        <div style="padding: 20px">
          <el-table v-loading="solderLoading" :data="solderRecordList" stripe max-height="800">
            <el-table-column prop="SolderCode" label="锡膏码" width="800" show-overflow-tooltip />
            <el-table-column prop="UserID" label="工号" width="120" />
            <el-table-column label="用户" width="150">
              <template #header>
                <el-select
                  v-model="selectedUser"
                  placeholder="选择用户"
                  clearable
                  @change="handleUserFilter"
                >
                  <el-option
                    v-for="user in userList"
                    :key="user.user_id"
                    :label="user.user_name"
                    :value="user.user_id"
                  />
                </el-select>
              </template>
              <template #default="scope">
                {{ scope.row.UserName }}
              </template>
            </el-table-column>
            <el-table-column prop="Type" label="类型" width="120" />
            <el-table-column label="时间" width="180">
              <template #header>
                <span style="cursor: pointer" @click="handleTimeSort">
                  时间
                  <el-icon>
                    <component :is="sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'" />
                  </el-icon>
                </span>
              </template>
              <template #default="scope">
                {{ scope.row.DateTime }}
              </template>
            </el-table-column>
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
            
            <el-pagination
              v-model:current-page="temperQueryParams.page"
              v-model:page-size="temperQueryParams.page_size"
              :page-sizes="[10, 20, 50, 100]"
              :total="temperTotal"
              :page-size-opts="[10, 20, 50, 100]"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleTemperSizeChange"
              @current-change="handleTemperCurrentChange"
            >
              <template #total>
                共 {{ temperTotal }} 条
              </template>
              <template #sizes="{ item }">
                {{ item.value }} 条/页
              </template>
              <template #jumper>
                前往 <el-input v-model="temperQueryParams.page" /> 页
              </template>
            </el-pagination>
          
            <el-button type="primary" size="large" @click="handleTemperQuery">查询</el-button>
          </div>
        </div>
        <div ref="chart" style="width: 100%; height: 600px"></div>
        
        <div style="padding: 20px">
          <el-table v-loading="temperLoading" :data="temperRecordList" stripe max-height="800">
            <el-table-column prop="ReTemper" label="回温温度" />
            <el-table-column prop="ColdTemperS" label="冷藏温度S" />
            <el-table-column prop="ColdTemperM" label="冷藏温度M" />
            <el-table-column prop="ColdTemperD" label="冷藏温度D" />
            <el-table-column prop="DateTime" label="时间" />
          </el-table>
        </div>
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
import recordApi, { 
  TemperatureResponse, 
  UserResponse, 
  SolderFlowResponse,
  User 
} from '@renderer/api/record/index'
import userApi from '@renderer/api/user'
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

const userList = ref<User[]>([])
const selectedUser = ref('')
const sortOrder = ref<'asc' | 'desc'>('desc')

const temperLoading = ref(true)
const temperRecordList = ref([])
const temperInterval = ref([])
const solderLoading = ref(true)
const solderRecordList = ref([])
const solderInterval = ref([])
const solderQueryParams = ref({
  solder_code: '',
  user_id: null,
  record_type: '',
  page: 1,
  page_size: 10,
  sort_order: 'desc'
})
const chart = ref(null)
const activeName = ref('solder')
const total = ref(0)
const temperQueryParams = ref({
  start_date: '',
  end_date: '',
  page: 1,
  page_size: 10
})
const temperTotal = ref(0)

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
    record_type: '',
    page: 1,
    page_size: 10,
    sort_order: 'desc'
  }
  solderInterval.value = []
  getSolderList()
}

const handleSizeChange = (val: number) => {
  solderQueryParams.value.page_size = val
  getSolderList()
}

const handleCurrentChange = (val: number) => {
  solderQueryParams.value.page = val
  getSolderList()
}

const handleTemperSizeChange = (val: number) => {
  temperQueryParams.value.page_size = val
  getTemperList()
}

const handleTemperCurrentChange = (val: number) => {
  temperQueryParams.value.page = val
  getTemperList()
}

const getUserList = () => {
  userApi.getUserList().then((res: UserResponse) => {
    if (res.code === 0) {
      console.log('用户列表如下：')
      console.log(res.data)
      userList.value = res.data
      userList.value.unshift({ user_id: '', user_name: '全部用户' })
    }
  })
}

const handleUserFilter = (value: string) => {
  selectedUser.value = value
  getSolderList()
}

const handleTimeSort = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  getSolderList()
}

const getSolderList = () => {
  solderLoading.value = true
  recordApi
    .getSolderFlowRecords({
      start_date: solderInterval.value?.[0],
      end_date: solderInterval.value?.[1],
      solder_code: solderQueryParams.value.solder_code,
      user_id: selectedUser.value || null,
      record_type: solderQueryParams.value.record_type,
      page: solderQueryParams.value.page,
      page_size: solderQueryParams.value.page_size,
      sort_order: sortOrder.value
    })
    .then((res: SolderFlowResponse) => {
      solderLoading.value = false
      if (res.code === 0) {
        solderRecordList.value = res.data.list
        total.value = res.data.total
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
      end_date: temperInterval.value?.[1] || '2080-01-01',
      page: temperQueryParams.value.page,
      page_size: temperQueryParams.value.page_size
    })
    .then((res: TemperatureResponse) => {
      temperLoading.value = false
      if (res.code === 0) {
        temperRecordList.value = res.data.list
        temperTotal.value = res.data.total
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

onMounted(() => {
  getUserList()
})

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

.el-pagination {
  :deep(.el-pagination__total) {
    margin-right: 16px;
  }
  
  :deep(.el-pagination__sizes) {
    margin-right: 16px;
  }
}
</style>
