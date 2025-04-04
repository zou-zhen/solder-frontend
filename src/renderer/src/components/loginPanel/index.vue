<template>
  <el-dialog
    v-model="dialogVisible"
    title="登录"
    width="500px"
    :before-close="handleClose"
    destroy-on-close
    :close-on-click-modal="false"
    @open="focusInput"
  >
    <div>
      <el-form ref="ruleFormRef" :model="form" label-width="80px" label-position="left" status-icon>
        <el-form-item v-if="curLoadType === 'IC'" label="IC卡" prop="user_ic">
          <el-input
            ref="ICInputRef"
            v-model="form.user_ic"
            type="password"
            :placeholder="'请扫描IC卡'"
            clearable
            @keyup.enter="confirmLogin"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="curLoadType === 'Account'" label="用户名" prop="account">
          <el-input v-model="form.id" :placeholder="'请输入账号'" clearable></el-input>
          <!-- <el-input v-model="form.account" placeholder="请输入"></el-input> -->
        </el-form-item>
        <el-form-item v-if="curLoadType === 'Account'" label="密码" prop="password">
          <el-input
            v-model="form.password"
            :type="passwordVisible ? 'text' : 'password'"
            :placeholder="'请输入密码'"
            clearable
          >
            <template #suffix>
              <el-icon class="password-toggle" @click="togglePasswordVisibility">
                <span v-if="passwordVisible">
                  <View />
                  <!-- 显示图标 -->
                </span>
                <span v-else>
                  <Hide />
                  <!-- 隐藏图标 -->
                </span>
              </el-icon>
            </template>
          </el-input>
          <!-- <el-input v-model="form.password" placeholder="请输入" show-password></el-input> -->
        </el-form-item>
      </el-form>
    </div>
    <!-- <div class="camera-container"> -->
      <!-- <video ref="video" autoplay @click="getFrame"></video> -->
      <!-- <canvas ref="canvas" style="display: none"></canvas> -->
      <!-- <div class="overlay-text">点击检测</div> -->
    <!-- </div> -->

    <template #footer>
      <div class="dialog-footer">
        <el-button v-show="curLoadType !== 'face'" @click="handleLoadType('face')"
          >人脸登录</el-button
        >
        <el-button v-show="curLoadType !== 'IC'" @click="handleLoadType('IC')"
          ><el-icon><Switch /></el-icon>IC卡登录</el-button
        >
        <el-button v-show="curLoadType !== 'Account'" @click="handleLoadType('Account')"
          ><el-icon><Switch /></el-icon>账号登录</el-button
        >
        <el-button @click="cancelLogin">取消</el-button>
        <el-button type="primary" :loading="isLoggingIn" @click="confirmLogin">登录</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, watch,defineDirective, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import useUserStore from '@renderer/store/modules/user'
import { ipcRenderer } from 'electron'
import { setToken, clearToken,setUserId,getUserId } from '@renderer/utils/auth'
import userApi from '@renderer/api/user/index'
const ICInputRef = ref(null)
const curLoadType = ref<'IC' | 'Account' | 'face'>('IC')
const focusInput = () => {
  nextTick(() => {
    ICInputRef.value?.focus()
    // ICInputRef.value.focus()
  })
}
watch(curLoadType,(newVal) => {
  if (newVal === 'IC') {
    nextTick(() => {
      ICInputRef.value?.focus()
    })
  }
})

// onMounted(() => {
//   nextTick(() => {
//     const ICInput = document.querySelector<HTMLInputElement>('#ICInput');
//     if (ICInput) {
//       ICInput.focus();
//     }
//   });
// });

// // 定义自定义指令
// defineDirective('focus', {
//   mounted(el) {
//     el.querySelector('input')?.focus();
//   }
// })
const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:visible', 'login'])

// 双向绑定 visible
const dialogVisible = computed({
  get: () => props.visible,
  set: (value: boolean) => emit('update:visible', value)
})


const passwordVisible = ref(false)
const isLoggingIn = ref(false) // 登录按钮的 loading 状态

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value
}

// 登录表单数据
const form = ref({
  id: '',
  password: '',
  user_ic: ''
})

const useStore = useUserStore()

const ruleFormRef = ref()
// const rules = reactive({
//   account: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
//   password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
// })



// 关闭对话框前的逻辑
const handleClose = (done: () => void) => {
  console.log('Dialog closing...')
  form.value = {
    id: '',
    password: '',
    user_ic: ''
  }
  done() // 允许对话框关闭
}

// 重置定时器
const resetTimer = () => {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer)
  }
  inactivityTimer = setTimeout(() => {
    clearToken()
    window.removeEventListener('click', handleUserInteraction)
  }, 30000) // 1 分钟
}

// 监听全局点击事件
const handleUserInteraction = () => {
  console.log('handleUserInteraction')

  resetTimer()
  console.log('inactivityTimer', inactivityTimer)
}

// 取消登录
const cancelLogin = () => {
  form.value = {
    id: '',
    password: '',
    user_ic: ''
  }
  dialogVisible.value = false // 隐藏对话框
}

let inactivityTimer: null | NodeJS.Timeout = null
// 登录（主要处理人脸登录）
const handleLoadType = (type: 'IC' | 'Account' | 'face') => {
  if (type === 'face') {
    userApi.faceDetect().then((res: any) => {
      if (res.code === 0) {
        const token = res.data.token
        const user_id = res.data.user_id
        // 设置userStore的token
        useStore.token = token
        // 保存token到本地存储
        setToken(token)
        setUserId(user_id)
        emit('login')
      } else {
        ElMessage.error(res.data.message)
      }
    })
  } else {
    curLoadType.value = type
  }
}

// 确认登录（主要处理账号登录/IC卡登录）
const confirmLogin = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      isLoggingIn.value = true // 开始加载
      try {
        let loginData = {}
        if (curLoadType.value === 'IC') {
          loginData = { user_ic: form.value.user_ic, password: '', id: '' }
        } else if (curLoadType.value === 'Account') {
          loginData = { password: form.value.password, id: form.value.id, user_ic: '' }
        }
        const res = await useStore.login(loginData)
        if (res.data && res.code === 0) {
          // 登录成功，传递账号信息
          if (form.value.id !== '') {
            setUserId(form.value.id)
          } else if(form.value.user_ic !== ''){
            setUserId(form.value.user_ic)
          }
          emit('login')
        } else {
          ElMessage.error(res.data || '登录失败')
        }
      } catch (error) {
        ElMessage.error('发生错误')
      } finally {
        isLoggingIn.value = false // 加载完成
      }
    } else {
      return false
    }
  })
}
// // 确认登录
// const confirmLogin = () => {
//   // if (!form.account || !form.password) {
//   //   return alert('Please fill in both account and password')
//   // }
//   // emit('login', form) // 通知父组件登录成功，传递表单数据
//   // dialogVisible.value = false // 隐藏对话框
//   if (!ruleFormRef.value) return
//   ruleFormRef.value.validate(async (valid) => {
//     if (valid) {
//       isLoggingIn.value = true // 开始加载
//       try {
//         let loginData = {}
//         if (curLoadType.value === 'IC') {
//           loginData = { user_ic: form.value.user_ic, password: '', id: '' }
//         } else if (curLoadType.value === 'Account') {
//           loginData = { password: form.value.password, id: form.value.id, user_ic: '' }
//         }
//         const res = await useStore.login(loginData)
//         if (res.data && res.code === 0) {
//           emit('login')
//         } else {
//           ElMessage.error(res.data || '登录失败')
//         }
//       } catch (error) {
//         ElMessage.error('发生错误')
//       } finally {
//         isLoggingIn.value = false // 加载完成
//       }
//     } else {
//       return false
//     }
//   })
// }

// 视频
const video = ref<HTMLVideoElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)

let stream: MediaStream | null = null
const startCamera = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true })
    if (video.value) {
      video.value.srcObject = stream
    }
  } catch (error) {
    console.error('摄像头访问失败：', error)
  }
}

// 关闭摄像头
const stopCamera = () => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop())
    stream = null
  }
}

const getFrame = async () => {
  if (video.value && canvas.value) {
    const ctx = canvas.value.getContext('2d')
    if (ctx) {
      canvas.value.width = video.value.videoWidth
      canvas.value.height = video.value.videoHeight
      ctx.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height)
      const dataUrl = canvas.value.toDataURL('image/png')
      api.saveFile({ dataUrl, fileName: 'frame1.png' })

      // save2Local(dataUrl)
    }
  }
}

const save2Local = (dataUrl) => {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = 'frame.png'
  link.click()
}

watch(dialogVisible, (newVal) => {
  if (!newVal) {
    form.value = {
      id: '',
      password: '',
      user_ic: ''
    }
  }
})
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.camera-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
video {
  width: 100%;
  height: 200px;
  border: 2px solid #ccc;
  background: black;
}

.overlay-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: rgba(255, 255, 255, 0.2);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: bold;
  pointer-events: none;
}
</style>
