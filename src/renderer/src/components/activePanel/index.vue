<template>
  <el-dialog
    v-model="dialogVisible"
    title="激活"
    width="80%"
    style="height: 60%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <div class="form-item">
      <el-button type="primary" size="large" @click="extendTrial">延长试用期</el-button>
      <el-input v-model="activeCode" placeholder="请输入试用期激活码" size="large"></el-input>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, computed, PropType, watch } from 'vue'
// import { ipcRenderer } from 'electron'
import activateApi from '@renderer/api/activate/index'
import { ElMessage } from 'element-plus'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})

const dialogVisible = computed({
  get: () => props.visible,
  set: (value: boolean) => emit('update:visible', value)
})

const emit = defineEmits(['update:visible', 'connectSSE'])

const form = ref({})
const activeCode = ref('')
const extendTrial = () => {
  activateApi.extendTrial(activeCode.value).then((res: any) => {
    if (res.code === 0) {
      ElMessage({
        message: '延长成功！',
        type: 'success',
        duration: 3000 // 显示时长，默认3000ms
      })
      dialogVisible.value = false
      //emit('connectSSE', '/stream/trial_clock')
    } else {
      ElMessage({
        message: res.data,
        type: 'error',
        duration: 3000 // 显示时长，默认3000ms
      })
    }
  })
}

const initializeTrial = () => {
  activateApi.initializeTrial().then((res: any) => {
    if (res.code === 0) {
      ElMessage({
        message: '初始化成功！',
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
}

const handleClose = (done: () => void) => {
  console.log('Dialog closing...')
  emit('reset')
  done() // 允许对话框关闭
}

// 关闭弹框
const closeDialog = () => {
  emit('reset')
  dialogVisible.value = false
}

const submit = () => {
  const data = {}
  emit('handleSubmit', data)
}

watch(dialogVisible, (newVal) => {
  if (newVal) {
  }
})
</script>

<style scoped lang="scss"></style>
