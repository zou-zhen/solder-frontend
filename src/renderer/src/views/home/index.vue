<template>
  <div class="home">
    <div class="panel">
      <div class="video-panel">
        <video
          ref="videoPlayer"
          style="width: 100%; height: 100%; object-fit: cover"
          muted
          autoplay
        ></video>
        <!-- <Video :rtsp="rtspurl"></Video> -->
      </div>
      <div class="button-panel">
        <div class="button-panel-left">
          <el-button class="singal-button" type="primary" @click="onClick('store')">入库</el-button>
          <!-- <el-button class="singal-button" type="primary" @click="router.push('/outbound')"
            >出库</el-button
          > -->
          <el-button class="singal-button" type="primary" @click="onClick('outbound')"
            >出库</el-button
          >
        </div>
        <div class="button-panel-right">
          <el-button class="singal-button" type="primary" @click="onClick('recycle')"
            >回收</el-button
          >
          <el-button class="singal-button" type="primary" @click="onClick('reservation')"
            >预约</el-button
          >
          <el-button class="singal-button" type="primary" @click="onClick('inventoryQuery')"
            >查询</el-button
          >
          <!-- <el-button class="singal-button" type="primary" @click="router.push('/inventoryQuery')"
            >查询</el-button
          > -->
        </div>
      </div>
      <div class="progress-panel" style="font-size: 20px">
        冷藏容量：
        <el-progress class="el-progress"
          :text-inside="true"
          :stroke-width="36"
          :percentage="(capacityGroup.cold.cur / capacityGroup.cold.total) * 100"
          :format="formatText(capacityGroup.cold.cur, capacityGroup.cold.total)"
        />
        回温容量：
        <el-progress class="el-progress"
          :text-inside="true"
          :stroke-width="36"
          :percentage="(capacityGroup.warm.cur / capacityGroup.warm.total) * 100"
          :format="formatText(capacityGroup.warm.cur, capacityGroup.warm.total)"
          status="success"
        />
        待取容量：
        <el-progress class="el-progress"
          :text-inside="true"
          :stroke-width="36"
          :percentage="(capacityGroup.wait.cur / capacityGroup.wait.total) * 100"
          :format="formatText(capacityGroup.wait.cur, capacityGroup.wait.total)"
          status="warning"
        />
        <!-- 回温待取容量：
        <el-progress
          :text-inside="true"
          :stroke-width="20"
          :percentage="(capacityGroup.hui_dai.cur / capacityGroup.hui_dai.total) * 100"
          :format="formatText(capacityGroup.hui_dai.cur, capacityGroup.hui_dai.total)"
          status="exception"
        />
        异常容量：
        <el-progress
          :text-inside="true"
          :stroke-width="20"
          :percentage="(capacityGroup.yi.cur / capacityGroup.yi.total) * 100"
          :format="formatText(capacityGroup.yi.cur, capacityGroup.yi.total)"
          color="blue"
          status="exception"
        /> -->
        <el-button size="large" style="margin-top: -5px;margin-left: -15px; font-size: 20px;height:15%" @click="onClick('dataLog')">查看详情</el-button>
      </div>
      <div v-if="params" class="params-panel">
        <!-- <div v-for="(item, index) in data" :key="index" class="item">
          {{ item }}
        </div> -->
        <div class="item">
          <div class="title">冰柜</div>
          <div class="data">
            {{ `${params?.bg_shang}℃ ${params?.bg_zhong}℃ ${params?.bg_xia}℃` }}
          </div>
        </div>
        <div class="item">
          <div class="title">回温区</div>
          <div class="data">{{ `${params?.hui_wen}℃` }}</div>
        </div>
        <div></div>
      </div>
    </div>
    <!-- <div class="right-icons">
      <el-icon @click="drawer = true"><Tools /></el-icon>
    </div> -->
    <login-panel v-model:visible="loginVisible" @login="handleLogin"></login-panel>
    <store v-model:visible="storeVisible" :capacity-group="capacityGroup"></store>
  </div>
  <el-drawer v-model="drawer" title="I am the title" :with-header="false" size="10%">
    <div class="function-item" @click="onClick('user')">
      <i class="iconfont icon-yonghu"></i>
      <span>用户管理</span>
    </div>
    <div class="function-item" @click="onClick('system')">
      <i class="iconfont icon-xitong"></i>
      <span>系统配置</span>
    </div>
    <div class="function-item" @click="onClick('manual')">
      <i class="iconfont icon-jixiebi"></i>
      <span>示教</span>
    </div>
    <div class="function-item" @click="onClick('movement')">
      <i class="iconfont icon-zhoucheng"></i>
      <span>运动系统</span>
    </div>
    <div class="function-item" @click="onClick('station')">
      <i class="iconfont icon-gongweishebei"></i>
      <span>工位设置</span>
    </div>
    <el-divider></el-divider>
    <div class="function-item" @click="onClick('modelManagement')">
      <i class="iconfont icon-xinghaoguanli"></i>
      <span>型号管理</span>
    </div>
    <div class="function-item" @click="onClick('alert')">
      <i class="iconfont icon-00-baojingjilu-05-05"></i>
      <span>报警记录</span>
    </div>
    <div class="function-item" @click="onClick('dataLog')">
      <i class="iconfont icon-xunjianshujujilu"></i>
      <span>数据记录</span>
    </div>
  </el-drawer>
  <activePanel v-model:visible="activateVisible" @connect-s-s-e="connectSSE"></activePanel>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, onBeforeUnmount, shallowRef } from 'vue'
import router from '../../router/index'
import loginPanel from '@renderer/components/loginPanel/index.vue'
import store from './components/store.vue'
import { ElMessage } from 'element-plus'
import activePanel from '@renderer/components/activePanel/index.vue'
import activateApi from '@renderer/api/activate/index'
import system from '@renderer/api/system'
import Video from '@renderer/components/Video/index.vue'
import stationApi from '@renderer/api/station'
import flvjs from 'flv.js'

//自动刷新页面，5秒刷新一次
// function autoRefresh() {
//   setInterval(() => {
//     window.location.reload()
//   }, 5000)
// }
// 创建视频刷新函数，自动刷新视频
const refreshVideo = () => {
  if (player) {
    // player.unload()
    // player.detachMediaElement()
    flvDestroy()
    connectFlv()
  }
}

interface paramsType {
  bg_shang: string
  bg_zhong: string
  bg_xia: string
  hui_wen: string
}

interface capacityType {
  cur: number
  total: number
}

interface capacityGroupType {
  // dai: capacityType
  // hui: capacityType
  // hui_dai: capacityType
  // leng: capacityType
  // yi: capacityType
  cold: capacityType
  warm: capacityType
  wait: capacityType
}

// const rtsp = 'rtsp://807e9439d5ca.entrypoint.cloud.wowza.com:1935/app-rC94792j/068b9c9a_stream2'
const rtsp = 'rtsp://admin:jonsion1@192.168.1.64/h264/ch1/main/av_stream'
const id = '1'
let player = null
const videoPlayer = ref(null)
const connectFlv = () => {
  if (flvjs.isSupported()) {
    // const video = player
    if (videoPlayer.value) {
      player = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        url: `ws://localhost:8888/rtsp/${id}/?url=${rtsp}`
      })
      player.attachMediaElement(videoPlayer.value)
      try {
        player.load()
        player.play()
      } catch (error) {
        console.log(error)
      }
    }
  }
}

const flvDestroy = () => {
  if (player) {
    player.pause()
    player.unload()
    player.detachMediaElement()
    player.destroy()
    player = null
  }
}

const rtspurl = 'rtsp://admin:jonsion1@192.168.1.64/h264/ch1/main/av_stream'
const activateVisible = ref(false)
const loginVisible = ref(false)
const storeVisible = ref(false)
const curFunc = ref('')
const params = ref<paramsType>({
  bg_shang: '--',
  bg_zhong: '--',
  bg_xia: '--',
  hui_wen: '--'
})

const capacityGroup = ref<capacityGroupType>({
  // dai: { cur: 0, total: 1 },
  // hui: { cur: 0, total: 1 },
  // hui_dai: { cur: 0, total: 1 },
  // leng: { cur: 0, total: 1 },
  // yi: { cur: 0, total: 1 },
  cold: { cur: 0, total: 1 },
  warm: { cur: 0, total: 1 },
  wait: { cur: 0, total: 1 }
})

const eventSourceGroup = ref<Array<EventSource>>([])

const drawer = ref(false)

const formatText = (current, total) => {
  return () => `${current}/${total}` // 自定义为比例形式
}

//const onClick = (fnName: string) => {
//  loginVisible.value = true
//  curFunc.value = fnName
//}
const onClick = (fnName: string) => {
  if (fnName === 'alert') {
    curFunc.value = fnName
    handleLogin()
  } else {
    const token = localStorage.getItem('access_token')
    if (token) {
      curFunc.value = fnName
      handleLogin()
    } else {
      // loginVisible.value = true
      // 添加提示信息
      loginVisible.value = false
      ElMessage({
          message: '请先登录',
          type: 'warning',
          duration: 3000
        })
      curFunc.value = fnName
    }
  }
}
const handleLogin = () => {
  loginVisible.value = false
  switch (curFunc.value) {
    case 'store':
      storeVisible.value = true
      break
    case 'outbound':
      router.push('/outbound')
      break
    case 'reservation':
      router.push('/reservation')
      break
    case 'alert':
      router.push('/alert')
      break
    case 'dataLog':
      router.push('/dataLog')
      break
    case 'inventoryQuery':
      router.push('/inventoryQuery')
      break
    case 'manual':
      router.push('/manual')
      break
    case 'modelManagement':
      router.push('/modelManagement')
      break
    case 'recycle':
      router.push('/recycle')
      break
    case 'setting':
      router.push('/setting')
      break
    case 'station':
      router.push('/station')
      break
    case 'system':
      router.push('/system')
      break
    case 'user':
      router.push('/user')
      break
    case 'movement':
      router.push('/movement')
      break
    default:
      break
  }
  drawer.value = false
}

const activateRemain = ref()

const checkTrial = () => {
  activateApi.checkTrial().then((res: any) => {
    if (res.code === 0) {
      ElMessage({
        message: '还在试用期！' + res.data,
        type: 'success',
        duration: 1000 // 显示时长，默认3000ms
      })
      //connectSSE('/stream/trial_clock')
    } else {
      ElMessage({
        message: res.data,
        type: 'error',
        duration: 1000 // 显示时长，默认3000ms
      })
      activateVisible.value = true
    }
  })
}

checkTrial()

const getStorage = () => {
  stationApi.getStorageStation().then((res: any) => {
    if (res.code === 0) {
      const data = res.data
      capacityGroup.value = {
        cold: { cur: data.cold_storage_count, total: data.cold_storage_capacity },
        warm: { cur: data.warm_storage_count, total: data.warm_storage_capacity },
        wait: { cur: data.waiting_pickup_count, total: data.waiting_pickup_capacity }
      }
    } else {
      ElMessage({
        message: res.data,
        type: 'error',
        duration: 1000 // 显示时长，默认3000ms
      })
    }
  })
}

getStorage()

const lastDataTimestamp = ref<number | null>(null) // 记录最后接收到数据的时间戳
const heartbeatInterval = ref<number | null>(null) // 定时器ID，用于清除定时器

const connectSSE = (url: string) => {
  const eventSource = new EventSource('http://127.0.0.1:5000' + url)
  //const eventSource = new EventSource(url)

  // 监听数据事件
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)

    if (url === '/stream/tempStream') {
      params.value = {
        bg_shang: data.bg_shang.toFixed(2) || '--',
        bg_zhong: data.bg_zhong.toFixed(2) || '--',
        bg_xia: data.bg_xia.toFixed(2) || '--',
        hui_wen: data.hui_wen.toFixed(2) || '--'
      }
    } else if (url === '/stream/get_storage_station') {
      // capacityGroup.value = {
      //   dai: data.dai || { cur: 0, total: 1 },
      //   hui: data.hui || { cur: 0, total: 1 },
      //   hui_dai: data.hui_dai || { cur: 0, total: 1 },
      //   leng: data.leng || { cur: 0, total: 1 },
      //   yi: data.yi || { cur: 0, total: 1 }
      // }
      capacityGroup.value = {
        cold: { cur: data.cold_storage_count, total: data.cold_storage_capacity },
        warm: { cur: data.warm_storage_count, total: data.warm_storage_capacity },
        wait: { cur: data.waiting_pickup_count, total: data.waiting_pickup_capacity }
      }
      console.log('capacityGroup.value', capacityGroup.value)
    } else if (url === '/stream/trial_clock') {
      activateRemain.value = data
    }

    lastDataTimestamp.value = Date.now() // 更新接收到数据的时间戳
  }

  // 错误事件处理
  eventSource.onerror = () => {
    console.warn(`SSE 连接错误`)
  }

  eventSourceGroup.value.push(eventSource)
}

const videoElement = ref(null) // 引用视频元素

onMounted(() => {
  connectSSE('/stream/tempStream')
  // connectSSE('/stream/get_storage_station')
  connectFlv()
  //autoRefresh()//自动刷新整个页面
  setInterval(refreshVideo, 80000) // 每5秒刷新一次视频
  setInterval(getStorage, 5000) // 每5秒刷新一次容量数据

  // checkHeartbeat() // 启动心跳检测

  // 清除心跳检测定时器
  onBeforeUnmount(() => {
    if (heartbeatInterval.value) {
      clearInterval(heartbeatInterval.value)
    }
    if(player){
      flvDestroy()
    }
  })
  // connectSSE('/videostream/video')
  // connectWebsocket()
  // startStreaming()
  //startWebRTC()
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
  width: 100%;
  background-color: white; /* 设置背景色以便测试 */
}

.panel {
  display: grid;
  width: 95%;
  height: 95%;
  background-color: white;
  grid-template-columns: 55% 45%;
  grid-template-rows: 58% 38%;
  grid-gap: 10px 10px;

  .video-panel {
    background-color: grey;
    display: flex;
    justify-content: center;
    align-items: center;

    canvas {
      width: 100%;
      height: 100%;
    }
  }

  .button-panel {
    display: flex;
    gap: 10px;
    * {
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: stretch;

      .singal-button {
        flex-grow: 1;
        font-size: 36px;
      }
    }

    .button-panel-left {
      width: 50%;
    }

    .button-panel-right {
      flex: 1;
    }
  }

  .params-panel {
    background-color: #409eff;
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 每行显示 2 个元素 */
    gap: 10px; /* 每个元素间的间隔 */
    padding: 20px; /* 内边距，让内容和边框有一定距离 */
    border-radius: 10px;
    // width: 100%; /* 宽度，可根据需要调整 */

    /* 每个格子 */
    .item {
      text-align: center; /* 文本居中 */
      padding: 10px;
      background-color: #e6f7ff; /* 每个格子的背景颜色 */
      border-radius: 5px; /* 可选：格子圆角 */
      font-size: 20px; /* 字体大小 */
      color: #333; /* 文本颜色 */

      .title {
        font-weight: bold; /* 标题加粗 */
        margin-bottom: 25px; /* 标题和数据间距 */
      }

      .data {
        font-size: 20px; /* 数据字体更大 */
      }
    }
  }
}
.el-progress {
  height: 20%;
  font-size: 20px;
}
.function-item {
  display: flex;
  flex-direction: column; /* 图标在文字上方 */
  align-items: center; /* 居中对齐 */
  justify-content: center; /* 可选：垂直方向居中 */
  text-align: center;
  margin: 20px 0; /* 可选：增加间距 */
  cursor: pointer;
}

.function-item i {
  font-size: 24px; /* 根据需要调整图标大小 */
  margin-bottom: 5px; /* 图标与文字之间的间距 */
}

.function-item span {
  font-size: 14px; /* 调整文字大小 */
  font-weight: 500;
}

.function-item:hover {
  color: #007bff;
}

.right-icons {
  position: fixed; /* 固定在页面右侧 */
  top: 50%; /* 垂直居中 */
  right: 20px; /* 距离右边界 20px */
  transform: translateY(-50%); /* 修正垂直居中的偏移 */
  display: flex; /* 启用 Flexbox 布局 */
  flex-direction: column; /* 图标垂直排列 */
  gap: 15px; /* 图标之间的间距 */
}

.el-icon {
  font-size: 40px; /* 图标大小 */
  color: #333; /* 图标颜色 */
  cursor: pointer; /* 鼠标悬停效果 */
  transition: color 0.3s;
}

.el-icon:hover {
  color: #007bff; /* 悬停时改变图标颜色 */
}

.el-button {
  margin: 0;
}
</style>
