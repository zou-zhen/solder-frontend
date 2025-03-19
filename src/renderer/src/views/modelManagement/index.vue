<template>
  <div class="outbound-panel">
    <div class="store-out-panel">
      <div class="form-item" style="margin-left: 20px">
        <el-input v-model="barcodeInput" placeholder="请输入条码" style="width: 200px; margin-left: 10px" />
        <el-button type="primary" size="large" @click="handleAdd">添加型号</el-button>
      </div>
    </div>
    <div style="padding: 20px">
      <el-table v-loading="loading" :data="modelList" stripe max-height="800">
        <el-table-column prop="model" label="型号" />
        <el-table-column prop="model_sys_name" label="型号" />
        <el-table-column prop="min_cold_num" label="最小冷藏数量" />
        <el-table-column prop="rewarm_num" label="保持回温数量" />
        <el-table-column prop="ready_out_num" label="待取数量" />
        <el-table-column prop="stir_time" label="搅拌时间（秒）" />
        <el-table-column prop="stir_speed" label="搅拌速度(转/分钟)" />
        <el-table-column prop="rewarm_time" label="回温时间(分钟)" />
        <el-table-column prop="rewarm_max_time" label="允许最大回温时间(分钟)" />
        <el-table-column prop="ready_out_timeout" label="搅拌后存放超时(分钟)" />
        <el-table-column prop="shelf_life" label="保质期(天)" />
        <el-table-column prop="if_jiaoban" label="首次出库是否搅拌" />
        <el-table-column prop="min_lc_time" label="最小冷藏时间（小时）" />
        <el-table-column prop="out_chaoshi_auto_lc" label="出库超时自动冷藏（小时）" />
        <el-table-column prop="out_chaoshi_auto_lc_times" label="出库超时自动冷藏次数" />
        <el-table-column label="搅拌后是否允许回冰柜">
          <template #default="scope">
            {{
              scope.row.if_back_after_jiaoban === 1
                ? '是'
                : scope.row.if_back_after_jiaoban === 0
                ? '否'
                : ''
            }}
          </template>
        </el-table-column>
        <el-table-column prop="twice_chaoshi_jinzhi_in_binggui" label="二次超时禁入冰柜（小时）" />

        <el-table-column prop="modify_datetime" label="修改时间" />
        <el-table-column fixed="right" label="操作" min-width="140">
          <template #default="scope">
            <el-button
              type="primary"
              size="large"
              style="margin-right: 10px"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="primary"
              size="large"
              style="margin-top: 10px"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <!-- <div class="right-back">
    <el-button type="primary" class="grid-button" @click="goBack">返回上一页</el-button>
    <el-button type="primary" class="grid-button" @click="goHome">返回主页</el-button>
  </div> -->
  <editDialog
    v-model:visible="modelData.visible"
    :form-data="modelData.formData"
    :type="modelData.type"
    @reset="reset"
    @handle-submit="handleSubmit"
  ></editDialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import modelApi, { modelType } from '@renderer/api/model/index'
import { ElMessage, ElMessageBox } from 'element-plus'
import editDialog from './components/editDialog.vue'
const barcodeInput = ref('')
const loading = ref(true)
const modelList = ref<modelType[]>([])
const modelData = ref({
  visible: false,
  type: 'add' as 'add' | 'edit',
  formData: {
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
    if_jiaoban: '',
    min_lc_time: null,
    out_chaoshi_auto_lc: null,
    out_chaoshi_auto_lc_times: null,
    if_back_after_jiaoban: null,
    twice_chaoshi_jinzhi_in_binggui: null
    // lfJiaoban: '',
    // JiaobanRule: '',
    // MinLcTime: null,
    // OutChaoshiAutoLc: null,
    // OutChaoshiAutoLcTimes: null,
    // lfBackAfterJiaoban: '',
    // TwiceChaoshijinzhilnBinggui: null,
    // Twicelnku: ''
  } as modelType
})

const reset = () => {
  modelData.value.formData = {
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
    if_jiaoban: '',
    min_lc_time: null,
    out_chaoshi_auto_lc: null,
    out_chaoshi_auto_lc_times: null,
    if_back_after_jiaoban: null,
    twice_chaoshi_jinzhi_in_binggui: null
  }
  barcodeInput.value = '' // 清空条码输入框
}

const getList = () => {
  loading.value = true
  modelApi
    .getModelList()
    .then((res: any) => {
      loading.value = false
      if (res.code === 0) {
        modelList.value = res.data
      }
    })
    .catch((err) => {
      loading.value = false
      console.log(err)
    })
}

const handleAdd = () => {
  // modelData.value.visible = true
  // modelData.value.type = 'add'
  modelApi.getModelByBarcode({ barcode: barcodeInput.value }).then((res: any) => {
      if (res.code === 0) {
        if (res.data !== 'None'){
          modelData.value.formData.model = res.data
        } 
        modelData.value.visible = true
        modelData.value.type = 'add'
      }
      else{
        modelData.value.visible = true
        modelData.value.type = 'add'
      }
      console.log("传过来的barcode:",modelData.value.formData.model)
    })
  

}

const handleEdit = (_index: number, row: modelType) => {
  modelData.value.type = 'edit'
  modelData.value.formData = row
  modelData.value.visible = true
}
const handleDelete = (_index: number, row: modelType) => {
  ElMessageBox.confirm('确定要删除该型号吗?')
    .then(() => {
      modelApi.deleteModel({ model: row.model as string }).then((res: any) => {
        if (res.code === 0) {
          ElMessage({
            message: '删除成功！',
            type: 'success',
            duration: 3000 // 显示时长，默认3000ms
          })
        } else {
          ElMessage({
            message: '删除失败',
            type: 'error',
            duration: 3000 // 显示时长，默认3000ms
          })
        }
        getList()
      })
    })
    .catch(() => {
      // catch error
    })
}

const handleSubmit = (data: modelType) => {
  if (modelData.value.type === 'add') {
    // 将 barcodeInput.value 添加到 formData 中
    const payload = {
      ...data,
      barcode: barcodeInput.value
    }
    console.log('Sending payload to backend:', payload) // 调试信息
    modelApi.addModel(payload).then((res: any) => {
      modelData.value.visible = false
      if (res.code === 0) {
        ElMessage({
          message: '添加成功！',
          type: 'success',
          duration: 3000 // 显示时长，默认3000ms
        })
      }
      getList()
    })
  } else {
    modelApi.editModel(data).then((res: any) => {
      modelData.value.visible = false
      if (res.code === 0) {
        ElMessage({
          message: '编辑成功！',
          type: 'success',
          duration: 3000 // 显示时长，默认3000ms
        })
      }
      getList()
    })
  }
  reset()
}

getList()


// watch(barcodeInput, (newValue, oldValue) => {

// })
</script>

<style scoped lang="scss">
.outbound-panel {
  background-color: white;
  height: 100%;
}

.store-out-panel {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
  gap: 20px; /* 项目之间的间距 */
}

.grid-button {
  flex: 0 0 calc(50% - 40px); /* 每个按钮占50%的宽度，并减去间距 */
  height: 80px; /* 按钮高度 */
  font-size: 18px; /* 按钮字体大小 */
  text-align: center; /* 按钮文本居中 */
}

.right-back {
  position: fixed; /* 固定在页面右侧 */
  top: 80%; /* 垂直居中 */
  right: 20px; /* 距离右边界 20px */
  transform: translateY(-50%); /* 修正垂直居中的偏移 */
  display: flex; /* 启用 Flexbox 布局 */
  flex-direction: column; /* 图标垂直排列 */
  gap: 15px; /* 图标之间的间距 */
  z-index: 999;
}

.el-button {
  margin: 0;
}
</style>
