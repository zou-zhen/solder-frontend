<template>
  <el-dialog
    v-model="diaVisible"
    :title="type === 'add' ? '添加型号' : '编辑型号'"
    style="height: 600px; width: 60%; overflow: auto"
    :before-close="handleClose"
    destroy-on-close
    :close-on-click-modal="false"
  >
    <el-form ref="formRef" :model="form" label-width="20%" label-position="left">
      <el-form-item
        label="型号"
        prop="model"
        :rules="[{ required: true, message: '请输入型号', trigger: 'blur' }]"
      >
        <el-input
          v-model="form.model"
          :disabled="type === 'edit'"
          :placeholder="'请输入型号'"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="型号名称"
        prop="model_sys_name"
        :rules="[{ required: true, message: '请输入型号名称', trigger: 'blur' }]"
      >
        <el-input
          v-model="form.model_sys_name"
          :placeholder="'请输入型号名称'"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="最小冷藏数量"
        prop="min_cold_num"
        :rules="[{ required: true, message: '请输入最小冷藏数量', trigger: 'blur' }]"
      >
        <el-input
          v-model="form.min_cold_num"
          :placeholder="'请输入最小冷藏数量'"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="保持回温数量"
        prop="rewarm_num"
        :rules="[{ required: true, message: '请输入保持回温数量', trigger: 'blur' }]"
      >
        <el-input
          v-model="form.rewarm_num"
          :placeholder="'请输入保持回温数量'"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="待取数量"
        prop="ready_out_num"
        :rules="[{ required: true, message: '请输入待取数量', trigger: 'blur' }]"
      >
        <el-input v-model="form.ready_out_num" :placeholder="'请输入待取数量'" clearable></el-input>
      </el-form-item>
      <el-form-item
        label="搅拌规则"
        prop="jiaoban_rule"
        :rules="[{ required: true, message: '请选择搅拌规则', trigger: 'blur' }]"
      >
      <el-select v-model="form.jiaoban_rule" placeholder="请选择" clearable>
          <el-option label="自动搅拌" value="自动搅拌"></el-option>
          <el-option label="出库搅拌" value="出库搅拌"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="搅拌时间（秒）"
        prop="stir_time"
        :rules="[{ required: true, message: '请输入搅拌时间（秒）', trigger: 'blur' }]"
      >
        <el-input
          v-model="form.stir_time"
          :placeholder="'请输入搅拌时间（秒）'"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="搅拌速度(转/分钟)"
        prop="stir_speed"
        :rules="[{ required: true, message: '请输入搅拌速度(转/分钟)', trigger: 'blur' }]"
      >
        <el-input
          v-model="form.stir_speed"
          :placeholder="'请输入搅拌速度(转/分钟)'"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="回温时间(分钟)"
        prop="rewarm_time"
        :rules="[{ required: true, message: '请输入回温时间(分钟)', trigger: 'blur' }]"
      >
        <el-input
          v-model="form.rewarm_time"
          :placeholder="'请输入回温时间(分钟)'"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="允许最大回温时间(分钟)"
        prop="rewarm_max_time"
        :rules="[{ required: true, message: '请输入允许最大回温时间(分钟)', trigger: 'blur' }]"
      >
        <el-input
          v-model="form.rewarm_max_time"
          :placeholder="'请输入允许最大回温时间(分钟)'"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="搅拌后存放超时(分钟)"
        prop="ready_out_timeout"
        :rules="[{ required: true, message: '请输入搅拌后存放超时(分钟)', trigger: 'blur' }]"
      >
        <el-input
          v-model="form.ready_out_timeout"
          :placeholder="'请输入搅拌后存放超时(分钟)'"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="保质期(天)"
        prop="shelf_life"
        :rules="[{ required: true, message: '请输入保质期(天)', trigger: 'blur' }]"
      >
        <el-input v-model="form.shelf_life" :placeholder="'请输入保质期(天)'" clearable></el-input>
      </el-form-item>
      <el-form-item
        label="首次出库是否搅拌"
        prop="lf_jiaoban"
        :rules="[{ required: true, message: '请输入首次出库是否搅拌', trigger: 'blur' }]"
      >
        <el-select v-model="form.if_jiaoban" placeholder="请选择" clearable>
          <el-option label="是" value="是"></el-option>
          <el-option label="否" value="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="最小冷藏时间（小时）"
        prop="min_lc_time"
        :rules="[{ required: true, message: '请输入最小冷藏时间（小时）', trigger: 'blur' }]"
      >
        <el-input
          v-model="form.min_lc_time"
          :placeholder="'最小冷藏时间（小时）'"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="出库超时自动冷藏（小时）"
        prop="out_chaoshi_auto_lc"
        :rules="[{ required: true, message: '请输入出库超时自动冷藏（小时）', trigger: 'blur' }]"
      >
        <el-input
          v-model="form.out_chaoshi_auto_lc"
          :placeholder="'请输入出库超时自动冷藏（小时）'"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="出库超时自动冷藏次数"
        prop="out_chaoshi_auto_lc_times"
        :rules="[{ required: true, message: '请输入出库超时自动冷藏次数', trigger: 'blur' }]"
      >
        <el-input
          v-model="form.out_chaoshi_auto_lc_times"
          :placeholder="'请输入出库超时自动冷藏次数'"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="搅拌后是否允许回冰柜"
        prop="lf_back_after_jiaoban"
        :rules="[{ required: true, message: '请输入搅拌后是否允许回冰柜', trigger: 'blur' }]"
      >
        <el-select v-model="form.if_back_after_jiaoban" placeholder="请选择" clearable>
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="二次超时禁入冰柜（小时）"
        prop="twice_chaoshi_jinzhi_in_binggui"
        :rules="[{ required: true, message: '请输入二次超时禁入冰柜（小时）', trigger: 'blur' }]"
      >
        <el-input
          v-model="form.twice_chaoshi_jinzhi_in_binggui"
          :placeholder="'请输入二次超时禁入冰柜（小时）'"
          clearable
        ></el-input>
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
import { modelType } from '@renderer/api/model/index'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  formData: {
    type: Object as PropType<modelType>,
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

const form = ref<modelType>({
  min_cold_num: null,
  model: '',
  modify_datetime: '',
  model_sys_name: '',
  ready_out_num: null,
  ready_out_timeout: null,
  rewarm_max_time: null,
  rewarm_num: null,
  rewarm_time: null,
  shelf_life: null,
  stir_speed: null,
  stir_time: null,
  z_offset: null,
  if_jiaoban: '',
  jiaoban_rule: '',
  min_lc_time: null,
  out_chaoshi_auto_lc: null,
  out_chaoshi_auto_lc_times: null,
  if_back_after_jiaoban: null,
  twice_chaoshi_jinzhi_in_binggui: null,
  twice_in_ku: ''
})

watch(diaVisible, (newVal) => {
  if (newVal) {
    form.value = JSON.parse(JSON.stringify(props.formData))
    console.log("传来的数据：",form.value)
    console.log("传来的型号数据：",form.value.model)
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
