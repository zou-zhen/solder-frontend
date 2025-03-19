<template>
  <el-dialog
    v-model="dialogVisible"
    title="点位表"
    width="80%"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <el-select v-model="selectedArea" placeholder="请选择区域" style="margin-bottom: 10px">
        <el-option label="冷藏区" value="冷藏区" />
        <el-option label="异常区" value="异常区" />
        <el-option label="待取区" value="待取区" />
        <el-option label="回温区" value="回温区" />
        <el-option label="入库区" value="入库区" />
        <el-option label="备用" value="备用" />
        <el-option label="取料区" value="取料区" />
        <el-option label="安全点" value="安全点" />
    </el-select>
    <el-button type="primary" @click="getList">查询点位表</el-button>
    <!-- <el-button type="primary" @click="editVisible = true">新增</el-button> -->
    <!-- <el-table v-loading="loading" :data="stationList" stripe :height="tableHeight"> -->
    <!-- 表项（表头） -->
    <el-table v-loading="loading" :data="stationList" stripe :height="tableHeight">
      <el-table-column prop="StaType" label="ID" width="180" />
      <el-table-column label="工位">
        <template #default="scope"> {{ scope.row.StaArea }} {{ scope.row.StationID }} </template>
      </el-table-column>
      <el-table-column prop="XAxis" label="X轴坐标" />
      <el-table-column prop="YAxis" label="Y轴坐标" />
      <el-table-column prop="ZAxis" label="Z轴坐标" />
      <el-table-column prop="RAxis" label="R轴坐标" />
      <el-table-column fixed="right" label="操作" min-width="140">
        <template #default="scope">
          <el-button type="primary" size="large" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格内容：分页 -->
    <el-pagination 
      v-model:current-page="page"
      @current-change="handleCurrentChange"
      background layout="prev, pager, next" :total="stationList.length" />

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <editTable
    v-model:visible="stationData.visible"
    :form-data="stationData.formData"
    :type="stationData.type"
    @reset="reset"
    @handle-submit="handleSubmit"
  ></editTable>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import editTable from './editTable.vue'
import stationApi, { stationLocationType } from '@renderer/api/station/index'
import { ElMessage } from 'element-plus'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})

const editVisible = ref(false)
const page = ref(1)
const loading = ref(true)
const stationList = ref([])
const selectedArea = ref('')
const stationData = ref({
  visible: false,
  type: 'add' as 'add' | 'edit',
  formData: {
    x: null,
    y: null,
    z: null,
    r: null,
    StaType: ''
  }
})

const reset = () => {
  stationData.value.formData = {
    x: null,
    y: null,
    z: null,
    r: null,
    StaType: ''
  }
}

const handleEdit = (_index: number, row) => {
  stationData.value.type = 'edit'
  stationData.value.formData = {
    x: row.XAxis,
    y: row.YAxis,
    z: row.ZAxis,
    r: row.RAxis,
    StaType: row.StaType
  }
  stationData.value.visible = true
}

const handleSubmit = (data: stationLocationType) => {
  if (stationData.value.type === 'add') {
    stationApi.updateStationLocation(data).then((res: any) => {
      stationData.value.visible = false
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
    stationApi.updateStationLocation(data).then((res: any) => {
      stationData.value.visible = false
      if (res.code === 0) {
        ElMessage({
          message: '添加成功！',
          type: 'success',
          duration: 3000 // 显示时长，默认3000ms
        })
      }
      getList()
    })
  }
  reset()
}

const emit = defineEmits(['update:visible'])

const dialogVisible = computed({
  get: () => props.visible,
  set: (value: boolean) => emit('update:visible', value)
})

const handleClose = (done: () => void) => {
  console.log('Dialog closing...')
  done() // 允许对话框关闭
}

// const getList = () => {
//   loading.value = true
//   stationApi
//     .getStation()
//     .then((res: any) => {
//       loading.value = false
//       if (res.code === 0) {
//         stationList.value = res.data
//       }
//     })
//     .catch((err) => {
//       loading.value = false
//       console.log(err)
//     })
// }
const getList = () => {
  loading.value = true
  stationApi
    .getStationByArea({ area: selectedArea.value, page: page.value })
    .then((res: any) => {
      loading.value = false
      if (res.code === 0) {
        stationList.value = res.data
      }
    })
    .catch((err) => {
      loading.value = false
      console.log(err)
    })
}
const handleCurrentChange = (newPage: number) => {
  page.value = newPage
  getList()
}
const tableHeight = ref(400) // 初始高度

const updateTableHeight = () => {
  const otherHeight = 350 // 其他固定元素的高度（例如导航栏）
  tableHeight.value = window.innerHeight - otherHeight
}

watch(dialogVisible, (newVal) => {
  if (newVal) {
    getList()
  }
})

onMounted(() => {
  updateTableHeight() // 初始化表格高度
  window.addEventListener('resize', updateTableHeight) // 监听窗口大小变化
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateTableHeight) // 移除监听
})
</script>

<style scoped lang="scss"></style>
