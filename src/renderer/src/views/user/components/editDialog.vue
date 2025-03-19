<template>
  <el-dialog
    v-model="diaVisible"
    :title="type === 'add' ? '新增用户' : '编辑用户'"
    :before-close="handleClose"
    destroy-on-close
    :close-on-click-modal="false"
  >
    <el-form ref="formRef" :model="form" label-width="80px">
      <el-form-item
        label="姓名"
        prop="user_name"
        :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]"
      >
        <!-- <el-input v-model="form.user_name"></el-input> -->
        <el-input v-model="form.user_name" :placeholder="'请输入姓名'"></el-input>
      </el-form-item>
      <el-form-item
        label="IC卡"
        prop="user_ic"
        :rules="[{ required: true, message: '请输入IC卡ID', trigger: 'blur' }]"
      >
        <!-- <el-input v-model="form.user_ic"></el-input> -->
        <!-- <BaseKeyboardInput v-model="form.user_ic" :placeholder="'请输入IC卡ID'"></BaseKeyboardInput> -->
        <el-input
          v-model="form.user_ic"
          type="password"
          placeholder="请扫描IC卡"
          clearable
        ></el-input>
        <!-- <BaseKeyboardInput
          v-model="form.user_ic"
          :placeholder="'请扫描IC卡'"
          :type="'password'"
          clearable
        >
        </BaseKeyboardInput> -->
      </el-form-item>
      <el-form-item
        label="用户等级"
        prop="user_grade"
        :rules="[{ required: true, message: '请输入用户等级', trigger: 'blur' }]"
      >
        <el-select v-model.number="form.user_grade" placeholder="请选择">
          <el-option label="0" :value="0"></el-option>
          <el-option label="1" :value="1"></el-option>
          <el-option label="2" :value="2"></el-option>
        </el-select>
        <!-- <el-input v-model.number="form.user_grade" type="number"></el-input> -->
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
      >
        <el-input
          v-model="form.password"
          :type="passwordVisible ? 'text' : 'password'"
          :placeholder="'请输入密码'"
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
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, PropType, watch } from 'vue'
import { userType } from '@renderer/api/user/index'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  formData: {
    type: Object as PropType<userType>,
    required: true
  },
  type: {
    type: String as PropType<'add' | 'edit'>,
    default: 'add'
  }
})

const diaVisible = computed({
  get: () => props.visible,
  set: (value: boolean) => emit('update:visible', value)
})

const emit = defineEmits(['update:visible', 'handleSubmit', 'reset'])

const formRef = ref()

const passwordVisible = ref(false)

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value
}

const form = ref<userType>({
  user_id: undefined,
  user_name: undefined,
  password: undefined,
  user_grade: undefined,
  user_ic: undefined
})

watch(diaVisible, (newVal) => {
  if (newVal) {
    form.value = JSON.parse(JSON.stringify(props.formData))
  }
})

const handleClose = (done: () => void) => {
  console.log('Dialog closing...')
  emit('reset')
  done() // 允许对话框关闭
}

// 关闭弹框
const closeDialog = () => {
  emit('reset')
  diaVisible.value = false
}

const submit = () => {
  emit('handleSubmit', form.value)
}
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
