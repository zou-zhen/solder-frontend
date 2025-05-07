<template>
  <div class="home">
    <div class="manual-panel">
      <div class="manual-panel-left">
        <div class="box1">
          <span>XYZR手动速度百分比</span>
          <el-slider
            v-model="allSpeed.XYZR手动速度百分比"
            show-input
            size="large"
            style="width: 40%"
            @change="handleUpdateSpeed('XYZR手动速度百分比')"
          />
          <el-button type="primary" size="large" @click="pointTableVisible = true"
            >查看点位表</el-button
          >
          <el-button
            type="primary"
            size="large"
            :disabled="!statusStore.switchStatus"
            @touchstart="onSetSport('回原位按钮', 1, 0, 'group1')"
            @touchend="onSetSport('回原位按钮', 2, 0, 'group1')"
            >回安全点</el-button
          >
        </div>
        <div class="box2">
          <div class="control-button" type="primary"></div>

          <el-button
            class="control-button"
            type="primary"
            :disabled="!statusStore.switchStatus"
            @touchstart="sendData('Y轴点动向前', 1)"
            @touchend="sendData('Y轴点动向前', 2)"
            @touchcancel="sendData('Y轴点动向前', 2)"
            >Y+</el-button
          >
          <div class="control-button" type="primary"></div>
          <el-button
            class="control-button"
            type="primary"
            :disabled="!statusStore.switchStatus"
            @touchstart="sendData('手动xy45度动作向上', 1)"
            @touchend="sendData('手动xy45度动作向上', 2)"
            @touchcancel="sendData('手动xy45度动作向上', 2)"
            >XY+</el-button
          >
          <el-button
            class="control-button"
            type="primary"
            :disabled="!statusStore.switchStatus"
            @touchstart="sendData('Z轴点动向上', 1)"
            @touchend="sendData('Z轴点动向上', 2)"
            @touchcancel="sendData('Z轴点动向上', 2)"
            >Z-</el-button
          >
          <el-button
            class="control-button"
            type="primary"
            :disabled="!statusStore.switchStatus"
            @touchstart="sendData('R1轴点动正转', 1)"
            @touchend="sendData('R1轴点动正转', 2)"
            @touchcancel="sendData('R1轴点动正转', 2)"
            >R1+</el-button
          >
          <el-button
            class="control-button"
            type="primary"
            :disabled="!statusStore.switchStatus"
            @touchstart="sendData('R2轴点动正转', 1)"
            @touchend="sendData('R2轴点动正转', 2)"
            @touchcancel="sendData('R2轴点动正转', 2)"
            >R2+</el-button
          >
          <el-button
            class="control-button"
            type="primary"
            :disabled="!statusStore.switchStatus"
            @touchstart="sendData('X轴点动向左', 1)"
            @touchend="sendData('X轴点动向左', 2)"
            @touchcancel="sendData('X轴点动向左', 2)"
            >X+</el-button
          >
          <el-button
            class="control-button"
            type="primary"
            :disabled="!statusStore.switchStatus"
            @touchstart="sendData('Y轴点动向后', 1)"
            @touchend="sendData('Y轴点动向后', 2)"
            @touchcancel="sendData('Y轴点动向后', 2)"
            >Y-</el-button
          >

          <el-button
            class="control-button"
            type="primary"
            :disabled="!statusStore.switchStatus"
            @touchstart="sendData('X轴点动向右', 1)"
            @touchend="sendData('X轴点动向右', 2)"
            @touchcancel="sendData('X轴点动向右', 2)"
            >X-</el-button
          >
          <el-button
            class="control-button"
            type="primary"
            :disabled="!statusStore.switchStatus"
            @touchstart="sendData('手动xy45度动作向下', 1)"
            @touchend="sendData('手动xy45度动作向下', 2)"
            @touchcancel="sendData('手动xy45度动作向下', 2)"
            >XY-</el-button
          >
          <el-button
            class="control-button"
            type="primary"
            :disabled="!statusStore.switchStatus"
            @touchstart="sendData('Z轴点动向下', 1)"
            @touchend="sendData('Z轴点动向下', 2)"
            @touchcancel="sendData('Z轴点动向下', 2)"
            >Z+</el-button
          >
          <el-button
            class="control-button"
            type="primary"
            :disabled="!statusStore.switchStatus"
            @touchstart="sendData('R1轴点动反转', 1)"
            @touchend="sendData('R1轴点动反转', 2)"
            @touchcancel="sendData('R1轴点动反转', 2)"
            >R1-</el-button
          >
          <el-button
            class="control-button"
            type="primary"
            :disabled="!statusStore.switchStatus"
            @touchstart="sendData('R2轴点动反转', 1)"
            @touchend="sendData('R2轴点动反转', 2)"
            @touchcancel="sendData('R2轴点动反转', 2)"
            >R2-</el-button
          >
        </div>
        <div class="box3">
          <div class="box3-single">
            <div style="font-weight: bold">指令型寸动</div>
            <div class="box3-item">
              <span>点位</span>
              <el-select
                v-model="point1"
                placeholder="请选择"
                style="width: 40%"
                size="large"
                clearable
              >
                <el-option label="请选择" :value="''" />
                <el-option
                  v-for="item in pointOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-button
                size="large"
                @touchstart="handlePoint('执行', 1)"
                @touchend="handlePoint('执行', 2)"
              >
                <el-icon style="color: green; font-size: 16px"><CaretRight /></el-icon>
                执行
              </el-button>
              <el-button
                size="large"
                @touchstart="handlePoint('停止', 1)"
                @touchend="handlePoint('停止', 2)"
              >
                <span class="square-icon"></span>
                停止
              </el-button>
            </div>
          </div>
          <div class="box3-single">
            <div style="font-weight: bold">教导</div>
            <div class="box3-item">
              <span>点位</span>
              <el-select
                v-model="point2"
                placeholder="请选择"
                style="width: 40%"
                size="large"
                clearable
              >
                <el-option label="请选择" :value="''" />
                <el-option
                  v-for="item in pointOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-button
                size="large"
                @touchstart="handlePoint('教导', 1)"
                @touchend="handlePoint('教导', 2)"
              >
                <el-icon style="color: blue; font-size: 16px"><Location /></el-icon>
                教导
              </el-button>
            </div>
          </div>
        </div>
        <!-- <div class="button-group" style="margin-top: 10px">
          <el-button
            v-for="(item, index) in commands.group4"
            :key="item"
            type="primary"
            size="large"
            :disabled="!statusStore.switchStatus"
            :style="{
              backgroundColor: '#4A6FB1', // 浅蓝色
              color: 'white',
              borderColor: '#4A6FB1'
            }"
            @touchstart="onSetSport(item.action, 1, index, 'group4')"
            @touchend="onSetSport(item.action, 2, index, 'group4')"
          >
            {{ item.action }}
          </el-button>
        </div>

        <div class="button-group">
          <el-button
            v-for="(item, index) in commands.group3"
            :key="item.action"
            size="large"
            :style="{
              backgroundColor: '#F39C12', // 浅黄色
              color: 'white',
              borderColor: '#F39C12'
            }"
            :disabled="!statusStore.switchStatus"
            @touchstart="onSetSport(item.action, 1, index, 'group3')"
            @touchend="onSetSport(item.action, 2, index, 'group3')"
          >
            {{ item.action }}
          </el-button>
          <el-button
            v-for="(item, index) in commands.group2"
            :key="item.action"
            size="large"
            :style="{
              backgroundColor: '#F39C12', // 浅黄色
              color: 'white',
              borderColor: '#F39C12'
            }"
            :disabled="!statusStore.switchStatus"
            @touchstart="onSetSport(item.action, 1, index, 'group2')"
            @touchend="onSetSport(item.action, 2, index, 'group2')"
          >
            {{ item.action }}
          </el-button>
        </div> -->
        <div class="button-group" style="margin-top: 10px">
          <el-button
            v-for="(item, index) in commandsV2.group2"
            :key="item"
            type="primary"
            size="large"
            :color="item.color"
            :disabled="!statusStore.switchStatus"
            :style="{
              // backgroundColor: item.color,
              color: 'white',
              // borderColor: item.color,
            }"
            @touchstart="onSetSport(item.action, 1, index, 'group2')"
            @touchend="onSetSport(item.action, 2, index, 'group2')"
          >
            {{ item.action }}
          </el-button>
        </div>
        <div class="button-group" style="margin-top: 10px">
          <el-button
            v-for="(item, index) in commandsV2.group3"
            :key="item"
            type="primary"
            size="large"
            :color="item.color"
            :disabled="!statusStore.switchStatus"
            :style="{
              // backgroundColor: item.color,
              color: 'white',
              // borderColor: item.color,
            }"
            @touchstart="onSetSport(item.action, 1, index, 'group3')"
            @touchend="onSetSport(item.action, 2, index, 'group3')"
          >
            {{ item.action }}
          </el-button>
        </div>
      </div>
      <div class="manual-panel-right">
        <div class="box1">
          <el-button size="large" type="primary" @click="statusStore.handleSwitch">{{
            statusStore.switchStatus === true ? '手动' : '自动'
          }}</el-button>
        </div>
        <div class="box2">
          <div class="box-single">
            <div style="font-weight: bold">空间坐标</div>
            <div class="box-content">
              <span>X(mm/s):</span>
              <span>{{ paramsLocation.x_location.toFixed(2) }}</span>
            </div>
            <div class="box-content">
              <span>Y(mm/s):</span>
              <span>{{ paramsLocation.y_location.toFixed(2) }}</span>
            </div>
            <div class="box-content">
              <span>Z(mm/s):</span>
              <span>{{ paramsLocation.z_location.toFixed(2) }}</span>
            </div>
            <div class="box-content">
              <span>R1(°/s):</span>
              <span>{{ paramsLocation.r1_location.toFixed(2) }}</span>
            </div>
            <div class="box-content">
              <span>R2(°/s):</span>
              <span>{{ paramsLocation.r2_location.toFixed(2) }}</span>
            </div>
          </div>
        </div>
        <div class="box2 box3">
          <div class="box-single">
            <div style="font-weight: bold">马达回授转速</div>
            <div class="box-content">
              <span>J1(mm/s):</span>
              <span>{{ paramsSpeed.x_speed.toFixed(2) }}</span>
            </div>
            <div class="box-content">
              <span>J2(mm/s):</span>
              <span>{{ paramsSpeed.y_speed.toFixed(2) }}</span>
            </div>
            <div class="box-content">
              <span>J3(mm/s):</span>
              <span>{{ paramsSpeed.z_speed.toFixed(2) }}</span>
            </div>
            <div class="box-content">
              <span>J4(°/s):</span>
              <span>{{ paramsSpeed.r1_speed.toFixed(2) }}</span>
            </div>
            <div class="box-content">
              <span>J5(°/s):</span>
              <span>{{ paramsSpeed.r2_speed.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <pointTable v-model:visible="pointTableVisible"></pointTable>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'
import pointTable from './components/pointTable.vue'
import movementApi from '@renderer/api/movement/index'
import { ElMessage } from 'element-plus'
import stationApi from '@renderer/api/station/index'
import useStatusStore from '@renderer/store/modules/status'
import { io } from 'socket.io-client'

const point1 = ref('')
const point2 = ref('')
const statusStore = useStatusStore()
const pointTableVisible = ref(false)
const eventSourceGroup = ref<Array<EventSource>>([])
const params = ref({
  x_location: -49.694671630859375,
  x_speed: 0.0,
  y_location: 0.0,
  y_speed: -0.019073486328125,
  z_location: 77.73606872558594,
  z_speed: 0.0,
  r_location: 16.4020938873291,
  r_speed: 0.0
})
const paramsLocation = ref({
  x_location: -49.694671630859375,
  y_location: 0.0,
  z_location: 77.73606872558594,
  r1_location: 16.4020938873291,
  r2_location: 0.0,
})
const paramsSpeed = ref({
  x_speed: 0.0,
  y_speed: -0.019073486328125,
  z_speed: 0.0,
  r1_speed: 0.0,
  r2_speed: 0.0,
})

const loading = ref(true)
type CommandStatus = {
  action: string
  status: boolean
  color: string
}

// const commands = ref<{
//   group3: CommandStatus[]
//   group4: CommandStatus[]
//   group2: CommandStatus[]
//   group1: CommandStatus[]
// }>({
//   group3: [
//     { action: '冰箱门推拉动作', status: true },
//     { action: '冰箱门推拉复位', status: true },
//     { action: '冰箱门滑台动作', status: true },
//     { action: '冰箱门滑台复位', status: true }
//   ],
//   group4: [
//     { action: '模组夹爪气缸动作', status: true },
//     { action: '模组夹爪气缸复位', status: true },
//     { action: '模组180度旋转气缸动作', status: true },
//     { action: '模组180度旋转气缸复位', status: true },
//     { action: '模组45度旋转气缸动作', status: true },
//     { action: '模组45度旋转气缸复位', status: true }
//   ],
//   group2: [
//     { action: '出库滑台动作', status: true },
//     { action: '出库滑台复位', status: true }
//   ],
//   group1: [{ action: '回原位按钮', status: true }]
// })

const commandsV2 = ref<{
  group1: CommandStatus[]
  group2: CommandStatus[]
  group3: CommandStatus[]
}>({
  group1: [{ action: '回原位按钮', status: true, color: '' }],
  group2: [
    { action: '模组夹爪气缸动作', status: true, color: '#4A6FB1' },
    { action: '模组180度旋转气缸动作', status: true, color: '#F39C12' },
    { action: '模组45度旋转气缸动作', status: true, color: '#4A6FB1' },
    { action: '冰箱门1推拉动作', status: true, color: '#F39C12' },
    { action: '冰箱门1滑台动作', status: true, color: '#F39C12' },
    { action: '冰箱门2推拉动作', status: true, color: '#4A6FB1' },
    { action: '冰箱门2滑台动作', status: true, color: '#4A6FB1' },
    { action: '出库滑台动作', status: true, color: '#F39C12' }
  ],
  group3: [
    { action: '模组夹爪气缸复位', status: true, color: '#4A6FB1' },
    { action: '模组180度旋转气缸复位', status: true, color: '#F39C12' },
    { action: '模组45度旋转气缸复位', status: true, color: '#4A6FB1' },
    { action: '冰箱门1推拉复位', status: true, color: '#F39C12' },
    { action: '冰箱门1滑台复位', status: true, color: '#F39C12' },
    { action: '冰箱门2推拉复位', status: true, color: '#4A6FB1' },
    { action: '冰箱门2滑台复位', status: true, color: '#4A6FB1' },
    { action: '出库滑台复位', status: true, color: '#F39C12' }
  ]
})

const pointOptions = ref<{ label: string; value: string }[]>([])

const getList = () => {
  loading.value = true
  stationApi
    .getStations()
    .then((res: any) => {
      loading.value = false
      if (res.code === 0) {
        pointOptions.value = res.data
          .filter((item: any) => item.StaType !== '默认类型')
          .map((item: any) => {
            return {
              label: `${item.StaArea}${item.StationID}-${item.StaType}`,
              value: item.StaType
            }
          })
        console.log(pointOptions.value)  
      }
    })
    .catch((err) => {
      loading.value = false
      console.log(err)
    })
}

const updateStatus = (data) => {
  // 遍历所有 group
  // Object.keys(commands.value).forEach((groupKey) => {
  //   commands.value[groupKey].forEach((item) => {
  //     // 根据 data 中的值更新状态
  //     if (data[item.action] !== undefined) {
  //       item.status = data[item.action]
  //     }
  //   })
  // })
  Object.keys(commandsV2.value).forEach((groupKey) => {
    commandsV2.value[groupKey].forEach((item) => {
      // 根据 data 中的值更新状态
      if (data[item.action] !== undefined) {
        item.status = data[item.action]
      }
    })
  })
}

const getButtonGroupStatueList = () => {
  movementApi.getSportStates2().then((res: any) => {
    if (res.code === 0) {
      updateStatus(res.data)
    } else {
      ElMessage({
        message: res.data,
        type: 'error',
        duration: 3000 // 显示时长，默认3000ms
      })
    }
  })
}

const handleJob = (action: string, tag: number) => {
  if (!statusStore.switchStatus) {
    // 如果 switchStatus 为 false，阻止执行
    return
  }
  movementApi.tuned(action, tag).then((res: any) => {
    if (res.code === 0) {
      ElMessage({
        message: '操作成功！',
        type: 'success',
        duration: 3000 // 显示时长，默认3000ms
      })
      params.value = res.data
    } else {
      ElMessage({
        message: res.data,
        type: 'error',
        duration: 3000 // 显示时长，默认3000ms
      })
    }
  })
}

const handlePoint = (action: '执行' | '停止' | '教导', tag: number) => {
  let pointValue = ''
  if (action === '教导') {
    pointValue = point2.value
  } else {
    pointValue = point1.value
  }

  if (pointValue !== '') {
    // 使用 match() 并检查结果是否为 null
    const matchResult = pointValue.match(/\[(\d+)\]/)

    if (matchResult && matchResult[1]) {
      // 只有在 match 成功且 matchResult[1] 存在时，才进行后续操作
      movementApi.tunedOperate(action, tag, parseInt(matchResult[1])).then((res: any) => {
        if (res.code === 0) {
          ElMessage({
            message: '操作成功！',
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
    } else {
      // 如果匹配失败（matchResult 为 null 或者没有捕获到数字），可以提示错误
      ElMessage({
        message: '无效的点位值，无法提取id。',
        type: 'error',
        duration: 3000 // 显示时长，默认3000ms
      })
    }
  }
}

const onSetSport = (action: string, tag: number, index: number, groupId: string) => {
  if (!statusStore.switchStatus) {
    // 如果 switchStatus 为 false，阻止执行
    return
  }
  movementApi.setSport(action, tag).then((res: any) => {
    if (res.code === 0) {
      ElMessage({
        message: '操作成功！',
        type: 'success',
        duration: 3000 // 显示时长，默认3000ms
      })
      commandsV2.value[groupId][index].status = res.data

      // getList()
    } else {
      ElMessage({
        message: res.data,
        type: 'error',
        duration: 3000 // 显示时长，默认3000ms
      })
    }
  })
}

const allSpeed = ref({
  X轴满载速度: 0,
  Y轴满载速度: 0,
  Z轴满载速度: 0,
  R轴满载速度: 0,
  XYZR自动速度百分比: 0,
  XYZR手动速度百分比: 0
})

const getSpeedList = () => {
  movementApi.getSpeed().then((res: any) => {
    if (res.code === 0) {
      allSpeed.value = res.data
    } else {
      ElMessage({
        message: res.data,
        type: 'error',
        duration: 1000 // 显示时长，默认3000ms
      })
    }
  })
}

const handleUpdateSpeed = (type: string) => {
  movementApi.tunedSpeed({ type: type, value: Number(allSpeed.value[type]) }).then((res: any) => {
    if (res.code === 0) {
      ElMessage({
        message: '修改成功！',
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
statusStore.getSwitchStatus()
getList()
getSpeedList()
getButtonGroupStatueList()

const lastDataTimestamp = ref<number | null>(null) // 记录最后接收到数据的时间戳
const heartbeatInterval = ref<number | null>(null) // 定时器ID，用于清除定时器

const connectSSE = (url: string, retryLimit = 5) => {
  const retryCount = 0
  //const eventSource = new EventSource(url)
  const eventSource = new EventSource('http://127.0.0.1:5000' + url)

  // 监听数据事件
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)

    if (url === '/stream/get_location') {
      console.log('get_location', data)
      paramsLocation.value = data
      // params.value = data
    } else if (url === '/stream/get_speed') {
      console.log('get_speed', data)
      paramsSpeed.value = data
      // params.value = data
    }

    lastDataTimestamp.value = Date.now() // 更新接收到数据的时间戳
  }

  // 错误事件处理
  eventSource.onerror = () => {
    console.warn(`SSE 连接错误`)
  }
  eventSourceGroup.value.push(eventSource)
}

// 点击按钮发送数据
const sendData = (action: string, tag: number) => {
  handleJob(action, tag)
  // if (socket.value && socket.value.connected) {
  //   socket.value.emit('message', { action, tag })
  //   ElMessage({
  //     message: '操作成功！',
  //     type: 'success',
  //     duration: 1000 // 显示时长，默认3000ms
  //   })
  // } else {
  //   ElMessage({
  //     message: '操作失败',
  //     type: 'error',
  //     duration: 1000 // 显示时长，默认3000ms
  //   })
  // }
}

onMounted(() => {
  connectSSE('/stream/get_location')
  connectSSE('/stream/get_speed')
  //connectWebsocketControl()

  //checkHeartbeat() // 启动心跳检测

  // 清除心跳检测定时器
  onBeforeUnmount(() => {
    if (heartbeatInterval.value) {
      clearInterval(heartbeatInterval.value)
    }
  })
})

onUnmounted(() => {
  eventSourceGroup.value.map((eventSource) => {
    eventSource.close()
  })
})
</script>

<style scoped lang="scss">
.home {
  display: flex; /* 启用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100%; /* 占满视口高度 */
  background-color: white; /* 设置背景色以便测试 */
}
.manual-panel {
  display: flex;
  width: 95%;
  height: 95%;
  background-color: white;
  gap: 10;

  .manual-panel-left {
    width: 80%;

    .box1 {
      display: flex; /* 使用 Flexbox 布局 */
      align-items: center; /* 垂直居中对齐 */
      justify-content: space-between; /* 水平对齐并添加间距 */
      width: 94%; /* 宽度可以根据需要调整 */
      height: 20%;
      span {
        margin-right: 10px; /* 让文字和滑块之间有一点间距 */
      }

      .el-slider {
        flex-grow: 1; /* 滑块占用剩余空间 */
        margin: 0 10px; /* 在滑块左右添加一定间距 */
      }

      .el-button {
        margin-left: 10px; /* 让按钮和滑块之间有一点间距 */
      }
    }

    .box2 {
      width: 94%;
      height: 36%;
      border: 1px solid grey;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-template-rows: 2fr 2fr;
      gap: 5px;
      padding: 10px;
      box-sizing: border-box;

      .control-button {
        width: 80%;
        height: 80%;
        font-size: 24px;
      }
    }

    .box3 {
      width: 94%;
      height: 20%;
      // border: 1px solid grey;
      box-sizing: border-box;
      margin-top: 2%;
      display: flex;

      .box3-single {
        width: 50%;
        height: 100%;
        border: 1px solid grey;
        box-sizing: border-box;
        padding: 10px;

        .box3-item {
          // display: flex;
          // align-content: center;
          margin-top: 10px;

          span {
            margin-right: 10px; /* 让文字和滑块之间有一点间距 */
          }

          .el-button {
            margin-left: 10px; /* 让按钮和滑块之间有一点间距 */
          }
        }
      }
    }
    .button-group {
      display: flex;
      flex-wrap: wrap;
      gap: 25px;
      width: 100%;
      margin-bottom: 10px;
    }
  }

  .manual-panel-right {
    flex: 1;

    .box1 {
      height: 20%;
      width: 80%;
      display: flex; /* 使用 Flexbox 布局 */
      align-items: center; /* 垂直居中对齐 */
      justify-content: space-between; /* 水平对齐并添加间距 */
    }
    .box2 {
      width: 80%;
      height: 28%;
      border: 1px solid grey;
      box-sizing: border-box;
      padding: 10px;
    }
    .box3 {
      margin-top: 8%;
    }
  }
}

.box-content {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}

.square-icon {
  display: inline-block;
  width: 12px; /* 图标宽度 */
  height: 12px; /* 图标高度 */
  background-color: red; /* 继承文字颜色 */
}

.grid-button {
  flex: 0 0 calc(50% - 40px); /* 每个按钮占50%的宽度，并减去间距 */
  height: 80px; /* 按钮高度 */
  font-size: 18px; /* 按钮字体大小 */
  text-align: center; /* 按钮文本居中 */
}

.right-icons {
  position: fixed; /* 固定在页面右侧 */
  top: 80%; /* 垂直居中 */
  right: 20px; /* 距离右边界 20px */
  transform: translateY(-50%); /* 修正垂直居中的偏移 */
  display: flex; /* 启用 Flexbox 布局 */
  flex-direction: column; /* 图标垂直排列 */
  gap: 15px; /* 图标之间的间距 */
}

.el-button {
  margin: 0;
}
</style>
s
