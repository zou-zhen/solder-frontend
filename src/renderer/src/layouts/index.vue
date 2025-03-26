<template>
  <div class="layout_container">
    <!-- 顶部导航 -->
    <div class="layout_tabbar">
      <div
        class="tag-block"
        style="margin-left: 10px; cursor: pointer; height: 70%; font-size: 45px"
        @click="router.push('/home')"
      >
        智能锡膏柜管理系统
      </div>
      <div class="flex"></div>
      <div class="tag-block" style="margin-left: 10px; cursor: pointer; height: 70%">
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
            font-size: 18px;
            background-color: #ffbf6b;
            height: 50%;
            padding: 5px;
            border-radius: 10px;
            color: #bd3124;
          "
        >
          <el-icon><WarningFilled /></el-icon>
          <el-tooltip placement="top" popper-class="tooltip-size">
            <template #content>
              <div v-for="(key, index) in filteredAlertKeys" :key="index" style="font-size: 20px">
                {{ key }}<br /><br />
              </div>
            </template>
            <el-button>最新{{ falseCount }}条报警</el-button>
          </el-tooltip>
          <!-- <span
            v-if="falseCount > 0"
            style="
              color: #bd3124;
              max-width: 300px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            "
            >{{ Object.keys(alertInfo).filter((key) => alertInfo[key])[0] }}</span
          >
          <span v-if="falseCount > 1" style="color: #bd3124"> 等{{ falseCount }}条报警 </span> -->
          <el-button
            size="small"
            style="background-color: #e99d42; color: black; border-color: #e99d42"
            @click="onClick('alert')"
            >查看所有报警</el-button
          >
        </div>
      </div>
      <div class="flex"></div>
      <div style="display: flex; flex-direction: column; margin-top: 10px; width: 25%">
        <div class="tag-block" style="margin-right: 10px; height: 45%;display: flex; justify-content:flex-end">
          <el-button class="el-button" @click="logout">退出账号</el-button>
          <el-button :icon="Refresh" class="el-button" @click="debouncedReload">刷新</el-button>
          <el-button
            class="el-button"
            @touchstart="onSetSport('报警复位按钮', 1)"
            @touchend="onSetSport('报警复位按钮', 2)"
            >报警复位</el-button
          >
          <!-- <el-button @click="onClick('cold')">一键冷藏</el-button> -->
          <el-button class="el-button" @click="drawer = true">设置</el-button>
          <el-button class="el-button" v-if="currentRoute.path !== '/home'" @click="router.push('/home')"
            >返回</el-button
          >
        </div>
        <span class="time-display" style="margin-right: 10px;display: flex; justify-content:flex-end">{{ currentTime }}</span>
        <div class="tag-block" style="margin-right: 10px;height:35%;display: flex; justify-content:flex-end">
          <el-tag type="primary" class="el-tag">{{ statusStore.modeName }}</el-tag>
          <el-tag type="success" class="el-tag">报警</el-tag>
          <el-tag type="info" class="el-tag">{{ statusStore.switchStatus === true ? '手动' : '自动' }}</el-tag>
          <el-tag type="warning" class="el-tag">未回零</el-tag>
          <el-tag type="danger" class="el-tag">未在搅拌</el-tag>
        </div>
      </div>
      
    </div>
    <!-- 内容展示区域 -->
    <div class="layout_main">
      <router-view></router-view>
    </div>
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
    <!-- <div class="function-item" @click="router.push('/system')">
      <i class="iconfont icon-xitong"></i>
      <span>系统配置</span>
    </div> -->
    <div class="function-item" @click="onClick('manual')">
      <i class="iconfont icon-jixiebi"></i>
      <span>示教</span>
    </div>
    <div class="function-item" @click="onClick('movement')">
      <i class="iconfont icon-zhoucheng"></i>
      <span>运动系统</span>
    </div>
    <el-divider></el-divider>
    <div class="function-item" @click="onClick('modelManagement')">
      <i class="iconfont icon-xinghaoguanli"></i>
      <span>型号管理</span>
    </div>
    <!-- <div class="function-item" @click="router.push('/modelManagement')">
      <i class="iconfont icon-xinghaoguanli"></i>
      <span>型号管理</span>
    </div> -->
    <div class="function-item" @click="onClick('alert')">
      <i class="iconfont icon-00-baojingjilu-05-05"></i>
      <span>报警记录</span>
    </div>
    <div class="function-item" @click="onClick('dataLog')">
      <i class="iconfont icon-xunjianshujujilu"></i>
      <span>数据记录</span>
    </div>
    <!-- <div class="function-item" @click="router.push('dataLog')">
      <i class="iconfont icon-xunjianshujujilu"></i>
      <span>数据记录</span>
    </div> -->
  </el-drawer>
  <login-panel v-model:visible="loginVisible" @login="handleLogin"></login-panel>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import router from '../router/index'
import { useRoute } from 'vue-router'
import useStatusStore from '@renderer/store/modules/status'
import loginPanel from '@renderer/components/loginPanel/index.vue'
import { ElMessage } from 'element-plus'
import movementApi from '@renderer/api/movement'
import { Refresh } from '@element-plus/icons-vue'
import debounce from 'lodash/debounce'

const statusStore = useStatusStore()
const currentRoute = useRoute()
const currentTime = ref('')
const drawer = ref(false)
const eventSourceGroup = ref<Array<EventSource>>([])
const alertInfo = ref({
  
})
// 定义变量并赋值
const filteredAlertKeys = computed(() => {
  return Object.keys(alertInfo.value).filter((key) => alertInfo.value[key])
})
statusStore.getSwitchStatus()
statusStore.getMode()

const loginVisible = ref(false)
const curFunc = ref('')

const handleLogin = () => {
  loginVisible.value = false
  switch (curFunc.value) {
    case 'alert':
      router.push('/alert')
      break
    case 'dataLog':
      router.push('/dataLog')
      break
    case 'manual':
      router.push('/manual')
      break
    case 'modelManagement':
      router.push('/modelManagement')
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
    case 'cold':
      onSetSport('一键冷藏按钮', 1)
      onSetSport('一键冷藏按钮', 2)
      break
    default:
      break
  }
  drawer.value = false
}

const onClick = (fnName: string) => {
  // 获取token
  const token = localStorage.getItem('access_token')

  if (token) { //如果已经登陆过了，且令牌没有过期，那么进入某个页面可以直接跳转过去，不用再进入登录弹框去登录了
    curFunc.value = fnName
    handleLogin()
  } else {
    loginVisible.value = true
    curFunc.value = fnName
  }
}
// 新增退出账号方法
const logout = () => {
  // 清除本地存储中的 token
  localStorage.removeItem('access_token')
  // 跳转到登录页面
  //router.push('/login')这个页面已经弃用了，直接跳转到首页/home
  //loginVisible.value = true
  router.push('/home')
}

// 使用 setInterval 更新时间
const updateTime = () => {
  const now = new Date()
  currentTime.value = `${now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })} ${now.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })}`
}

// 计算值为 false 的数量
const falseCount = computed(() => Object.values(alertInfo.value).filter((value) => value).length)

const onSetSport = (action: string, tag: number) => {
  movementApi.setSport(action, tag).then((res: any) => {
    if (res.code === 0) {
      ElMessage({
        message: '操作成功！',
        type: 'success',
        duration: 3000 // 显示时长，默认3000ms
      })

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

const connectSSE = (url: string, retryLimit = 5) => {
  const retryCount = 0

  const attemptConnection = () => {
    const eventSource = new EventSource('http://127.0.0.1:5000' + url)

    // 监听数据事件
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)

      if (url === '/stream/get_warn_states') {
        // console.log('data', data)
        alertInfo.value = data
      }
    }

    // 错误事件处理
    // eventSource.onerror = () => {
    //   retryCount++
    //   console.warn(`SSE 连接错误：${url}，重试次数：${retryCount}`)
    //   eventSource.close()

    //   if (retryCount >= retryLimit) {
    //     console.error(`连接 ${url} 失败，已达最大重试次数 ${retryLimit}`)
    //     return
    //   }

    //   // 自动重试，延迟 2 秒
    //   setTimeout(attemptConnection, 2000)
    // }

    eventSourceGroup.value.push(eventSource)
  }

  attemptConnection() // 开始首次连接
}

// 防抖函数，确保每 1 秒内只触发一次
const debouncedReload = debounce(() => {
  // 通过 IPC 发送刷新请求到主进程
  window.location.reload()
}, 1000) // 1000 毫秒 = 1 秒

onMounted(() => {
  connectSSE('/stream/get_warn_states')
  updateTime() // 初始化时间
  setInterval(updateTime, 1000) // 每秒更新一次
})

onUnmounted(() => {
  eventSourceGroup.value.map((eventSource) => {
    eventSource.close()
  })
})
</script>
<style lang="less">
.tooltip-size {
  max-width: 500px;
  max-height: 600px;
  font-size: 100px;
}
</style>
<style scoped lang="scss">
.tooltip-size {
  width: 400px;
  max-height: 600px;
}
.layout_tabbar {
  height: 15vh;
  background-color: #4095e5;
  opacity: 0.8;
  color: white;
  // line-height: 10vh;
  font-size: 30px;
  display: flex;
  justify-content: center;

  .flex {
    flex: 1;
  }
}

.layout_main {
  background-color: #eff0f2;
  height: 90vh;
}

.tag-block {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
.el-button {
  height: 100%;
  font-size: 20px;
}

.alert-block {
  height: 100%;
  width: 30%;
  display: flex;
  justify-content: center;
  align-content: center;
}

.alert-box {
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 5px;
  font-size: 20px;
  // height: 100%;
  width: 30%;
}

.alert-box-warning {
  background-color: #ffbf6b;
  width: 100%;
  height: 50%;
}

.time-display {
  color: white;
  font-size: 20px;
  // margin-top: 5px;
  text-align: right;
  margin-right: 35px;
}
.el-tag {
  width: 16%;
  height: 90%;
  font-size: 18px;
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
  font-size: 60px; /* 根据需要调整图标大小 */
  margin-bottom: 5px; /* 图标与文字之间的间距 */
}

.function-item span {
  font-size: 20px; /* 调整文字大小 */
  font-weight: 500;
}

.function-item:hover {
  color: #007bff;
}
</style>
