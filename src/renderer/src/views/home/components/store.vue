<template>
  <el-dialog
    v-model="dialogVisible"
    title="入库"
    width="900px"
    :before-close="handleClose"
    :close-on-click-modal="false"
    destroy-on-close
  >
    <div class="store-panel">
      <div class="info-box">
        <el-button type="primary" style="margin-bottom: 5px" @click="getData"
          >获取最新信息</el-button
        >
        <div>
          冷藏容量：{{ capacityGroup.cold.cur }} 冷藏剩余容量：{{ capacityGroup.cold.total }}
        </div>
        <!-- <div v-if="curSolderData.solder_code" class="qrcode-info">
          <div>锡膏码：{{ curSolderData.solder_code }}</div>
          <div>型号：{{ curSolderData.model }}</div>
          <div>到期时间：{{ curSolderData.expire_date }}</div>
          <div>通用1：{{ curSolderData.common1 }}</div>
          <div>通用2：{{ curSolderData.common2 }}</div>
          <div>通用3：{{ curSolderData.common3 }}</div>
        </div> -->
        <div v-if="code !== ''" class="qrcode-info">
          <div>锡膏码：{{ code }}</div>
        </div>
      </div>
      <div class="position-box">
        <div v-for="(item, index) in rukuData" :key="index" class="cell">
          <!-- <el-icon :color="item.disabled ? 'red' : 'green'"><InfoFilled /></el-icon> -->
          <div class="circle" :class="getStatusClass(item.Disabled)"></div>
          {{ item.StationID }}
        </div>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelDialog">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, ref, watch } from 'vue'
import movement from '@renderer/api/movement'
import stationApi from '@renderer/api/station'
import { ElMessage } from 'element-plus'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  capacityGroup: {
    type: Object,
    require: true
  }
})

const emit = defineEmits(['update:visible', 'login'])

const coldStorage = ref({
  total_capacity: null,
  total_remaining_capacity: null
})

const curSolderData = ref({
  solder_code: '',
  model: '',
  expire_date: '',
  common1: null,
  common2: null,
  common3: null
})

const storageRecords = ref([])

const rukuData = ref([])
const code = ref('')

const eventSourceGroup = ref<Array<EventSource>>([])

const getStatusClass = (status: 0 | 1 | 2 | 3): string => {
  switch (status) {
    case 0:
    case 1:
      return 'circle-empty'
    case 2:
      return 'circle-full'
    case 3:
      return 'circle-warn'
    default:
      return 'circle-empty' // 可选的默认值，如果不希望出现意外值
  }
}

const connectSSE = (url: string, retryLimit = 5) => {
  const retryCount = 0
  const eventSource = new EventSource('http://127.0.0.1:5000' + url)

  // 监听数据事件
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    if (url === '/stream/get_storage_station') {
      coldStorage.value = data.cold_storage
      curSolderData.value = data.solder_data
      storageRecords.value = data.stations_data
    } else if (url === '/stream/get_ruku_data') {
      code.value = data.code
      const keys = Object.keys(data.ruku_data)
      rukuData.value = keys.map((key: string) => {
        return { StationID: key, Disabled: data.ruku_data[key] }
      })
    }
  }

  // 错误事件处理
  eventSource.onerror = () => {
    console.warn(`SSE 连接错误`)
    // retryCount++
    // console.warn(`SSE 连接错误：${url}，重试次数：${retryCount}`)
    // if (retryCount > retryLimit) {
    //   console.error(`连接 ${url} 失败，已达最大重试次数 ${retryLimit}`)
    //   eventSource.close()
    //   return
    // }
    // // 自动重试，延迟 2 秒
    // setTimeout(() => connectSSE(url, retryLimit - retryCount), 5000)
  }
  eventSourceGroup.value.push(eventSource)
}

// 双向绑定 visible
const dialogVisible = computed({
  get: () => props.visible,
  set: (value: boolean) => emit('update:visible', value)
})

// 关闭对话框前的逻辑
const handleClose = (done: () => void) => {
  console.log('Dialog closing...')
  done() // 允许对话框关闭
}

const cancelDialog = () => {
  dialogVisible.value = false // 隐藏对话框
  eventSourceGroup.value.map((eventSource) => {
    eventSource.close()
  })
}

const intervalId = ref(null)

const getData = () => {
  stationApi.getRukuData().then((res: any) => {
    if (res.code === 0) {
      const { data } = res
      code.value = data.code
      const keys = Object.keys(data.ruku_data)
      rukuData.value = keys.map((key: string) => {
        return { StationID: key, Disabled: data.ruku_data[key] }
      })
      ElMessage({
        message: '获取成功！',
        type: 'success',
        duration: 1000 // 显示时长，默认3000ms
      })
    } else {
      ElMessage({
        message: res.data,
        type: 'error',
        duration: 1000 // 显示时长，默认3000ms
      })
    }
  })
}

const startPolling = () => {
  if (intervalId.value) return
  intervalId.value = setInterval(getData, 2000)
}

// 停止轮询
const stopPolling = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
}

watch(dialogVisible, (newVal) => {
  if (newVal) {
    // connectSSE('/stream/get_storage_station')
    // connectSSE('/stream/get_ruku_data')
    // startPolling()
    movement.inputOpen(1).then((res: any) => {
      if (res.code === 0) {
        ElMessage({
          message: '已开门！',
          type: 'success',
          duration: 1000 // 显示时长，默认3000ms
        })
      } else {
        ElMessage({
          message: res.data,
          type: 'error',
          duration: 1000 // 显示时长，默认3000ms
        })
      }
    })
    getData()
  } else {
    // stopPolling()
  }
})

onUnmounted(() => {
  eventSourceGroup.value.map((eventSource) => {
    eventSource.close()
  })
})
</script>

<style scoped lang="scss">
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.store-panel {
  display: flex;
  gap: 10px;

  .info-box {
    width: 40%;
    font-weight: bold;

    .qrcode-info {
      margin-top: 10px;
      width: 80%;
      // height: 80%;
      border: 1px solid black;
      border-radius: 5px;
      padding: 10px;
    }
  }

  .position-box {
    flex: 1;
    height: 600px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: repeat(7, 1fr);
    gap: 5px;

    .cell {
      // background-color: rgb(80, 156, 249);
      // background-color: rgb(192, 81, 81);
      border: 1px solid black;
      color: black;
      border-radius: 5px;
      text-align: center;
    }
  }
}

.circle {
  width: 40px; /* 圆点的宽度 */
  height: 40px; /* 圆点的高度 */
  background-color: red; /* 圆点的颜色 */
  border-radius: 50%; /* 设置为圆形 */
  display: inline-block; /* 内联块级元素，方便排列 */
}

.circle-full {
  background-color: green;
}

.circle-empty {
  background-color: grey;
}

.circle-warn {
  background-color: red;
}
</style>
