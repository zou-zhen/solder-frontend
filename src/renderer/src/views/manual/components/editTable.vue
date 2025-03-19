<template>
  <el-dialog
    v-model="dialogVisible"
    :title="type === 'add' ? '添加点位' : '编辑点位'"
    width="30%"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <el-form ref="formRef" :model="form" label-width="20%" label-position="left">
      <el-form-item
        label="X"
        prop="x"
        :rules="[{ required: true, message: '请输入X轴坐标', trigger: 'blur' }]"
      >
        <el-input v-model="form.x" :placeholder="'请输入X轴坐标'"></el-input>
      </el-form-item>
      <el-form-item
        label="Y"
        prop="y"
        :rules="[{ required: true, message: '请输入Y轴坐标', trigger: 'blur' }]"
      >
        <el-input v-model="form.y" :placeholder="'请输入Y轴坐标'"></el-input>
      </el-form-item>
      <el-form-item
        label="Z"
        prop="z"
        :rules="[{ required: true, message: '请输入Z轴坐标', trigger: 'blur' }]"
      >
        <el-input v-model="form.z" :placeholder="'请输入Z轴坐标'"></el-input>
      </el-form-item>
      <el-form-item
        label="R"
        prop="r"
        :rules="[{ required: true, message: '请输入R轴坐标', trigger: 'blur' }]"
      >
        <el-input v-model="form.r" :placeholder="'请输入R轴坐标'"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submit"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, computed, PropType, watch } from 'vue'
import { stationLocationType } from '@renderer/api/station/index'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  formData: {
    type: Object as PropType<stationLocationType>,
    required: true
  },
  type: {
    type: String as PropType<'add' | 'edit'>,
    default: 'add'
  }
})

const emit = defineEmits(['update:visible', 'handleSubmit', 'reset'])

const dialogVisible = computed({
  get: () => props.visible,
  set: (value: boolean) => emit('update:visible', value)
})

const form = ref<stationLocationType>({ x: null, y: null, z: null, r: null, StaType: '' })

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
  //console.log('submitform.value', form.value)
  for (const key in form.value) {
    let value = form.value[key]
    if (key !== 'StaType') {
      value = Number(form.value[key])
    }
    data[key] = value
  }
  //console.log('submit', data)
  emit('handleSubmit', data)
}

watch(dialogVisible, (newVal) => {
  if (newVal) {
    form.value = JSON.parse(JSON.stringify(props.formData))
  }
})
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
