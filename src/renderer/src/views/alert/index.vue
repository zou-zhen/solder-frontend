<template>
  <div class="outbound-panel">
    <div class="store-out-panel">
      <div class="form-item" style="margin-left: 20px">
        <el-date-picker
          v-model="alertInterval"
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
          v-model:current-page="page"
          v-model:page-size="pageSize"
          :page-sizes="[10, 15, 20]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        <el-button type="primary" size="large" @click="handleQuery">查询</el-button>
      </div>
      <div class="form-item">
        <el-button type="primary" size="large">删除</el-button>
      </div>
    </div>
    <div style="padding: 20px">
      <el-table v-loading="loading" :data="alertList" stripe max-height="800">
        <el-table-column prop="AlarmText" label="报警信息" />
        <el-table-column prop="StartTime" label="开始时间" />
        <el-table-column prop="EndTime" label="结束时间" />
        <el-table-column prop="Kind" label="类型">
          <template #default="scope">
            <span :style="{ color: getColor(scope.row.Kind) }">{{ scope.row.Kind }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import recordApi, { AlarmResponse } from '@renderer/api/record/index'

const loading = ref(true)
// 定义报警信息的接口
interface AlertItem {
  AlarmText: string
  StartTime: string
  EndTime: string
  Kind: string
}
const alertList = ref<AlertItem[]>([]) // 明确声明 alertList 的类型
const alertInterval = ref(['2020-01-01', '2030-01-01'])
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
let timer: NodeJS.Timeout | null = null
// const getList = () => {
//   loading.value = true
//   recordApi
//     .getAlarms({
//       start_date: alertInterval.value[0],
//       end_date: alertInterval.value[1]
//     })
//     .then((res: any) => {
//       loading.value = false
//       if (res.code === 0) {
//         alertList.value = res.data
//       }
//     })
//     .catch((err) => {
//       loading.value = false
//       console.log(err)
//     })
// }
const getList = () => {
  loading.value = true
  recordApi
    .getAlarms({
      start_date: alertInterval.value[0],
      end_date: alertInterval.value[1],
      page: page.value,
      page_size: pageSize.value
    })
    .then((res: AlarmResponse) => {
      loading.value = false
      console.log('res', res);
      console.log('res.code', res.code);
      console.log('res.data', res.data);
      if (res.code === 0) {
        alertList.value = res.data.alarms
        total.value = res.data.total
        console.log(res.data)
        console.log(alertList.value)
        console.log(total.value)
      }
    })
    .catch((err) => {
      loading.value = false
      console.log(err)
    })
}
// const handleQuery = () => {
//   getList()
// }

//用于处理默认查询操作
const handleQuery = () => {
  page.value = 1 // 重置页码为第一页
  getList()
}
//用于处理页码变化
const handleSizeChange = (newPageSize: number) => {
  pageSize.value = newPageSize
  page.value = 1 // 重置页码为第一页
  getList()
}
const handleCurrentChange = (newPage: number) => {
  page.value = newPage
  getList()
}
// 根据 Kind 的值返回不同的颜色
const getColor = (kind: string) => {
  if (kind === '报警') {
    return 'red'
  } else if (kind === '警告') {
    return '#FFA500'
  }
  return 'black' // 默认颜色
}
getList()

const startAutoRefresh = () => {
  timer = setInterval(() => {
    getList()
  }, 60000) // 每分钟更新一次
}
const stopAutoRefresh = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}
onMounted(() => {
  getList()
  startAutoRefresh()
})
onBeforeUnmount(() => {
  stopAutoRefresh()
})

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
