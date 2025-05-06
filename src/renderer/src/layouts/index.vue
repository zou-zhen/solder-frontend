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
          <!-- 新增登录/退出按钮 -->
          <el-button class="el-button" @click="toggleLogin">{{ isLogin ? '退出' : '登录' }}</el-button>
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
        <!-- 显示当前用户信息 -->
        <span class="time-display" style="margin-right: 10px;display: flex; justify-content:flex-end">当前用户：{{ userId || '无' }} &nbsp; {{ userName || '' }} </span>
        <div class="tag-block" style="margin-right: 10px;height:35%;display: flex; justify-content:flex-end">
          <el-tag type="primary" class="el-tag">{{ statusStore.modeName }}</el-tag>
          <el-tag type="success" class="el-tag">报警</el-tag>
          <el-tag type="info" class="el-tag">{{ statusStore.switchStatus === true ? '手动' : '自动' }}</el-tag>
          <el-tag type="warning" class="el-tag">未回零</el-tag>
          <el-tag type="danger" class="el-tag">{{ statusStore.is_stiring === true ? '正在搅拌' : '未在搅拌' }}  </el-tag>
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
    <div class="function-item" @click="onClick('alert')">
      <i class="iconfont icon-00-baojingjilu-05-05"></i>
      <span>报警记录</span>
    </div>
    <div class="function-item" @click="onClick('dataLog')">
      <i class="iconfont icon-xunjianshujujilu"></i>
      <span>数据记录</span>
    </div>
  </el-drawer>
  <login-panel v-model:visible="loginVisible" @login="handleLogin"></login-panel>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed ,watch} from 'vue'
import router from '../router/index'
import { useRoute } from 'vue-router'
import useStatusStore from '@renderer/store/modules/status'
import loginPanel from '@renderer/components/loginPanel/index.vue'
import { ElMessage } from 'element-plus'
import movementApi from '@renderer/api/movement'
import { Refresh } from '@element-plus/icons-vue'
import debounce from 'lodash/debounce'
import useUserStore from '@renderer/store/modules/user'
import { setToken,getToken,getUserId, getUserName } from '@renderer/utils/auth'
// import { console } from 'inspector'
const statusStore = useStatusStore()
const currentRoute = useRoute()
const currentTime = ref('')
const drawer = ref(false)
const eventSourceGroup = ref<Array<EventSource>>([])
const alertInfo = ref({})
const filteredAlertKeys = computed(() => {
  return Object.keys(alertInfo.value).filter((key) => alertInfo.value[key])
})
statusStore.getSwitchStatus()
statusStore.getMode()
statusStore.getIsStiring()

const loginVisible = ref(false)
const curFunc = ref('')
// 新增变量
const userStore = useUserStore()
const token = getToken()
const isLogin = ref(false)
const userId = ref(getUserId())
const userName = ref(getUserName())
if (token){
  isLogin.value = true
}
const handleLogin = () => {
  console.log('handleLogin 函数被调用')
  isLogin.value = true
  userId.value = getUserId()
  window.location.reload()
  // 设置定时器到期时间,到时间自动退出登录
  const expirationTime = Date.now() + 1000 * 3000
  localStorage.setItem('logoutTimer', expirationTime.toString())
}

const swtichPage = () => {
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
  if (fnName === 'alert') {
    curFunc.value = fnName
    swtichPage()
  } else {
    if (token) {
      curFunc.value = fnName
      swtichPage()
    } else {
      // 添加提示信息:请先去登录按钮登录，而不再是直接在这里弹出登录框
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

const logout = () => {
  console.log('logout 函数被调用')
  userStore.logout() //调用 useUserStore 的 logout 函数
  router.push('/home')
  // 手动退出登录后：刷新页面
  window.location.reload()
  // 自动退出后：清除 localStorage 中的定时器信息
  localStorage.removeItem('logoutTimer')
}

// 新增函数
const toggleLogin = () => {
  if (isLogin.value) {
    logout()
  } else {
    loginVisible.value = true
  }
}

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

const falseCount = computed(() => Object.values(alertInfo.value).filter((value) => value).length)

const onSetSport = (action: string, tag: number) => {
  movementApi.setSport(action, tag).then((res: any) => {
    if (res.code === 0) {
      ElMessage({
        message: '操作成功！',
        type: 'success',
        duration: 3000
      })
    } else {
      ElMessage({
        message: res.data,
        type: 'error',
        duration: 3000
      })
    }
  })
}

const connectSSE = (url: string, retryLimit = 5) => {
  const retryCount = 0
  const attemptConnection = () => {
    const eventSource = new EventSource('http://127.0.0.1:5000' + url)
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (url === '/stream/get_warn_states') {
        alertInfo.value = data
      }
    }
    eventSourceGroup.value.push(eventSource)
  }
  attemptConnection()
}

const debouncedReload = debounce(() => {
  window.location.reload()
}, 1000)

onMounted(() => {
  connectSSE('/stream/get_warn_states')
  updateTime()
  setInterval(updateTime, 1000)
  // 检查 localStorage 中是否存在定时器信息
  const expirationTime = localStorage.getItem('logoutTimer')
  if (expirationTime) {
    const remainingTime = parseInt(expirationTime) - Date.now()
    if (remainingTime > 0) {
      setTimeout(() => {
        logout()
      }, remainingTime)
    } else {
      // 定时器已过期，立即退出登录
      logout()
    }
  }
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 20px 0;
  cursor: pointer;
}

.function-item i {
  font-size: 60px;
  margin-bottom: 5px;
}

.function-item span {
  font-size: 20px;
  font-weight: 500;
}

.function-item:hover {
  color: #007bff;
}
</style>