<template>
  <div class="outbound-panel">
    <div class="store-out-panel">
      <div class="single-setting">
        <span class="sub-title">温度/气压设置</span>
        <div class="form-item">
          <span class="label">冰柜温度设置（℃）</span>
          <el-input
            v-model="allSettings.冰柜温度设置"
            class="inputer"
            size="large"
            clearable
            @blur="handleUpdateSettings('冰柜温度设置')"
          ></el-input>
        </div>
        <div class="form-item">
          <span class="label">温度采集周期（秒）</span>
          <el-input
            v-model="allSettings.温度采集周期"
            class="inputer"
            size="large"
            clearable
            @blur="handleUpdateSettings('温度采集周期')"
          ></el-input>
        </div>
        <div class="form-item">
          <span class="label">回温区低温报警设置温度（℃）</span>
          <el-input
            v-model="allSettings.回温区低温报警设置温度"
            class="inputer"
            size="large"
            clearable
            @blur="handleUpdateSettings('回温区低温报警设置温度')"
          ></el-input>
        </div>
        <div class="form-item">
          <span class="label">回温区高温报警设置温度（℃）</span>
          <el-input
            v-model="allSettings.回温区高温报警设置温度"
            class="inputer"
            size="large"
            clearable
            @blur="handleUpdateSettings('回温区高温报警设置温度')"
          ></el-input>
        </div>
        <div class="form-item">
          <span class="label">冰柜内低温报警设置温度（℃）</span>
          <el-input
            v-model="allSettings.冰柜内低温报警设置温度"
            class="inputer"
            size="large"
            clearable
            @blur="handleUpdateSettings('冰柜内低温报警设置温度')"
          ></el-input>
        </div>
        <div class="form-item">
          <span class="label">冰柜内高温报警设置温度（℃）</span>
          <el-input
            v-model="allSettings.冰柜内高温报警设置温度"
            class="inputer"
            size="large"
            clearable
            @blur="handleUpdateSettings('冰柜内高温报警设置温度')"
          ></el-input>
        </div>
      </div>
      <div class="single-setting">
        <span class="sub-title">系统设置</span>
        <div class="form-item">
          <span class="label">禁用蜂鸣按钮</span>
          <el-switch
            v-model="allSettings.系统配置_禁用蜂鸣按钮"
            size="large"
            @change="handleUpdateSwitch('系统配置_禁用蜂鸣按钮')"
          />
        </div>
        <div class="form-item">
          <span class="label">禁用门锁按钮</span>
          <el-switch
            v-model="allSettings.系统配置_禁用门锁按钮"
            size="large"
            @change="handleUpdateSwitch('系统配置_禁用门锁按钮')"
          />
        </div>
        <div class="form-item">
          <span class="label">模式</span>
          <el-select
            v-model="mode"
            placeholder="请选择"
            size="large"
            class="selector"
            @change="updataMode"
          >
            <el-option label="冷藏模式" :value="0"></el-option>
            <el-option label="日常模式" :value="1"></el-option>
          </el-select>
        </div>
        <div class="form-item">
          <el-button type="primary" size="large" @click="handleOrderMode">开工时间预约</el-button>
          <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
          <el-date-picker
            v-model="curSettingTime"
            type="datetime"
            placeholder="Select date and time"
            size="large"
            style="width: 240px"
            value-format="YYYY-MM-DD HH:mm:ss"
            format="YYYY-MM-DD HH:mm:ss"
          />
        </div>
        <div class="form-item">
          <el-button
            size="large"
            type="primary"
            @touchstart="handleButton('强制关闭冰箱', 1)"
            @touchend="handleButton('强制关闭冰箱', 2)"
            >强制关闭冰箱</el-button
          >
        </div>
        <div class="form-item">
          <el-button
            size="large"
            type="primary"
            @touchstart="handleButton('一键清步序ID', 1)"
            @touchend="handleButton('一键清步序ID', 2)"
            >一键清步序ID</el-button
          >
        </div>
      </div>
      <div class="single-setting">
        <span class="sub-title">报警设置</span>
        <div class="form-item">
          <span class="label">禁用气压传感器报警</span>
          <el-switch
            v-model="allSettings.系统配置_禁用气压传感器报警"
            size="large"
            @change="handleUpdateSwitch('系统配置_禁用气压传感器报警')"
          />
        </div>
        <div class="form-item">
          <span class="label">禁用液位传感器报警</span>
          <el-switch
            v-model="allSettings.系统配置_禁用液位传感器报警"
            size="large"
            @change="handleUpdateSwitch('系统配置_禁用液位传感器报警')"
          />
        </div>
        <div class="form-item">
          <span class="label">禁用温度传感器报警</span>
          <el-switch
            v-model="allSettings.系统配置_禁用温度传感器报警"
            size="large"
            @change="handleUpdateSwitch('系统配置_禁用温度传感器报警')"
          />
        </div>
      </div>

      <div class="single-setting">
        <span class="sub-title">锡膏操作</span>
        <div class="form-item">
          <el-button
            size="large"
            type="primary"
            @touchstart="handleButton('系统配置_锡膏全部人工拿走后清除库位锡膏信息', 1)"
            @touchend="handleButton('系统配置_锡膏全部人工拿走后清除库位锡膏信息', 2)"
            >锡膏全部人工拿走后清除库位锡膏信息</el-button
          >
        </div>

        <div class="form-item">
          <el-button
            style="width: 150px"
            size="large"
            type="primary"
            @click="handleForceSettings('强制清除信息的库位号')"
            >强制清除工位信息</el-button
          >
          <el-input
            v-model="forceParams.stationID"
            size="large"
            placeholder="强制清除信息的库位号"
            style="width: 280px"
            clearable
          ></el-input>
        </div>
        <div class="form-item">
          <el-button
            style="width: 150px"
            size="large"
            type="primary"
            @click="handleForceSettings('强制取出锡膏库位号')"
            >强制取出库位锡膏</el-button
          >
          <el-input
            v-model="forceParams.solderCode"
            size="large"
            placeholder="强制取出锡膏库位号"
            style="width: 280px"
            clearable
          ></el-input>
        </div>
        <div class="form-item">
          <!-- <el-button
            style="width: 150px"
            size="large"
            type="primary"
            @click="handleForceSettings('Z轴取放上位置间距')"
            >Z轴修正</el-button
          > -->
          <span style="width: 80px">Z轴修正</span>
          <el-input
            v-model="forceParams.z_offset"
            style="width: 280px"
            size="large"
            placeholder="Z轴取放上位置间距"
            clearable
            @blur="handleForceSettings('Z轴取放上位置间距')"
          ></el-input>
        </div>
        <div class="form-item">
          <span style="width: 80px">设备编号</span>
          <el-input style="width: 100px" size="large" clearable></el-input>
          <span>启用MES</span>
          <el-switch v-model="value1" size="large" class="selector" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import systemApi from '@renderer/api/system'
import { ElMessage } from 'element-plus'
import useStatusStore from '@renderer/store/modules/status'

const value1 = ref(true)
const curSettingTime = ref('')//开工时间
const forceParams = ref({
  stationID: '',
  solderCode: '',
  z_offset: ''
})

// 模式
const statusStore = useStatusStore()
const mode = ref<0 | 1 | 2>(statusStore.mode)
  const handleOrderMode = () => {
  systemApi
    .orderMode({
      OrderDateTime: curSettingTime.value
    })
    .then((res: any) => {
      if (res.code === 0) {
        ElMessage({
          message: '预约成功',
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
const updataMode = () => {
  statusStore.updataMode(mode.value)
}

const allSettings = ref({
  冰柜温度设置: 0,
  温度采集周期: 0,
  回温区低温报警设置温度: 0,
  回温区高温报警设置温度: 0,
  冰柜内低温报警设置温度: 0,
  冰柜内高温报警设置温度: 0,
  系统配置_强制取出库位锡膏: false,
  系统配置_禁用气压传感器报警: false,
  系统配置_禁用液位传感器报警: false,
  系统配置_禁用温度传感器报警: false,
  系统配置_禁用蜂鸣按钮: false,
  系统配置_禁用门锁按钮: true,
  系统配置_锡膏全部人工拿走后清除库位锡膏信息: false
})
const getSystemList = () => {
  systemApi.getSettings().then((res: any) => {
    if (res.code === 0) {
      allSettings.value = res.data
    } else {
      ElMessage({
        message: res.data,
        type: 'error',
        duration: 1000 // 显示时长，默认3000ms
      })
    }
  })
}

const handleForceSettings = (type: string) => {
  let value = ''
  if (type === '强制清除信息的库位号') {
    value = forceParams.value.stationID
  } else if (type === '强制取出锡膏库位号') {
    value = forceParams.value.solderCode
  } else if (type === 'Z轴取放上位置间距') {
    value = forceParams.value.z_offset
  }
  if (value === '') {
    ElMessage({
      message: '参数不能为空',
      type: 'warning',
      duration: 1000 // 显示时长，默认3000ms
    })
    return
  }
  systemApi.settings({ type, value }).then((res: any) => {
    if (res.code === 0) {
      ElMessage({
        message: '操作成功！',
        type: 'success',
        duration: 1000 // 显示时长，默认3000ms
      })
    } else {
      ElMessage({
        message: res.data,
        type: 'error',
        duration: 1000 // 显示时长，默认3000ms
      })
    }
  })
}

const handleUpdateSettings = (type: string) => {
  systemApi.settings({ type: type, value: Number(allSettings.value[type]) }).then((res: any) => {
    if (res.code === 0) {
      ElMessage({
        message: '修改成功！',
        type: 'success',
        duration: 1000 // 显示时长，默认3000ms
      })
    } else {
      ElMessage({
        message: res.data,
        type: 'error',
        duration: 1000 // 显示时长，默认3000ms
      })
    }
  })
}

const handleUpdateSwitch = (type: string) => {
  systemApi.settings({ type: type, value: allSettings.value[type] }).then((res: any) => {
    if (res.code === 0) {
      ElMessage({
        message: '修改成功！',
        type: 'success',
        duration: 1000 // 显示时长，默认3000ms
      })
    } else {
      ElMessage({
        message: res.data,
        type: 'error',
        duration: 1000 // 显示时长，默认3000ms
      })
    }
  })
}

const handleButton = (action: string, tag: number) => {
  systemApi.button({ action, tag }).then((res: any) => {
    if (res.code === 0) {
      ElMessage({
        message: '操作成功！',
        type: 'success',
        duration: 1000 // 显示时长，默认3000ms
      })
    } else {
      ElMessage({
        message: res.data,
        type: 'error',
        duration: 1000 // 显示时长，默认3000ms
      })
    }
  })
}

getSystemList()
statusStore.getMode()
</script>

<style scoped lang="scss">
.outbound-panel {
  background-color: white;
  height: 100%;
}

.demo-tabs {
  margin-left: 20px;
}

.store-out-panel {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; /* 允许换行 */
  gap: 100px; /* 项目之间的间距 */
}

.single-setting {
  margin-left: 20px;
  margin-top: 10px;

  .sub-title {
    font-weight: bold;
  }

  .form-item {
    display: flex;
    align-items: center; /* 垂直居中对齐 */
    gap: 20px; /* 标签与选择器之间的间距 */
    margin-top: 10px;
    margin-left: 0;

    .selector {
      width: 240px;
    }
    .inputer {
      width: 150px;
    }
  }

  .label {
    font-size: 16px;
    min-width: 250px; /* 确保宽度一致，便于对齐 */
    max-width: 150px;
    text-align: left;
  }
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
