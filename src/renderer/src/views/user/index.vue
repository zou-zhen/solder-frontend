<template>
  <div class="outbound-panel">
    <div class="store-out-panel">
      <div class="form-item" style="margin-left: 20px">
        <el-button type="primary" size="large" @click="handleAdd">添加用户</el-button>
      </div>
    </div>
    <div style="padding: 20px">
      <el-table v-loading="loading" :data="userList" stripe max-height="800">
        <el-table-column prop="user_id" label="用户ID" width="180" />
        <el-table-column prop="user_ic" label="IC卡ID" width="180" />
        <el-table-column prop="user_name" label="姓名" />
        <el-table-column prop="user_grade" label="用户等级" />
        <el-table-column prop="updateAt" label="修改时间" />
        <el-table-column fixed="right" label="操作" min-width="120">
          <template #default="scope">
            <el-button
              type="primary"
              size="large"
              style="margin-right: 10px"
              @click="handleFaceCollect(scope.row.user_id)"
              >录入人脸信息</el-button
            >
            <el-button
              type="primary"
              size="large"
              style="margin-right: 10px"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button type="primary" size="large" @click="handleDelete(scope.$index, scope.row)"
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
    v-model:visible="userData.visible"
    :form-data="userData.formData"
    :type="userData.type"
    @reset="reset"
    @handle-submit="handleSubmit"
  ></editDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '../../router/index'
import editDialog from './components/editDialog.vue'
import userApi, { userType } from '@renderer/api/user/index'
import { ElMessage, ElMessageBox } from 'element-plus'

const loading = ref(true)
const userList = ref<userType[]>([])

const userData = ref({
  visible: false,
  type: 'add' as 'add' | 'edit',
  formData: {
    user_id: undefined,
    user_name: undefined,
    password: undefined,
    user_grade: undefined,
    user_ic: undefined
  } as userType
})

const reset = () => {
  userData.value.formData = {
    user_id: undefined,
    user_name: undefined,
    password: undefined,
    user_grade: undefined,
    user_ic: undefined
  }
}

const handleFaceCollect = (userId: string) => {
  userApi.faceCollect({ user_id: userId })
}

const getList = () => {
  loading.value = true
  userApi
    .getUserList()
    .then((res: any) => {
      loading.value = false
      if (res.code === 0) {
        userList.value = res.data
      }
    })
    .catch((err) => {
      loading.value = false
      console.log(err)
    })
}

const handleAdd = () => {
  userData.value.visible = true
  userData.value.type = 'add'
}

const handleEdit = (_index: number, row: userType) => {
  userData.value.type = 'edit'
  userData.value.formData = row
  userData.value.visible = true
}
const handleDelete = (_index: number, row: userType) => {
  ElMessageBox.confirm('确定要删除该用户吗?')
    .then(() => {
      userApi.deleteUser({ user_id: row.user_id }).then((res: any) => {
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

const handleSubmit = (data: userType) => {
  if (userData.value.type === 'add') {
    userApi.addUser(data).then((res: any) => {
      userData.value.visible = false
      if (res.code === 0) {
        ElMessage({
          message: '添加成功！',
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
      getList()
    })
  } else {
    userApi.editUser(data).then((res: any) => {
      userData.value.visible = false
      if (res.code === 0) {
        ElMessage({
          message: '编辑成功！',
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
      getList()
    })
  }
}

getList()

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push('/home')
}
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
