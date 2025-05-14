<template>
  <div class="outbound-panel">
    <el-collapse v-model="activeName" style="margin-left: 20px;">
      <el-collapse-item title="轴设置" name="1">
        <div class="form-item">
          <span class="label">X轴满载速度：</span>
          <el-input
            v-model="allSpeed.X轴满载速度"
            class="inputor"
            size="large"
            @blur="handleUpdateSpeed('X轴满载速度')"
            @keypress="input_filter"
          ></el-input>
          <span class="label">Y轴满载速度：</span>
          <el-input
            v-model="allSpeed.Y轴满载速度"
            class="inputor"
            size="large"
            @blur="handleUpdateSpeed('Y轴满载速度')"
            @keypress="input_filter"
          ></el-input>
          <span class="label">Z轴满载速度：</span>
          <el-input
            v-model="allSpeed.Z轴满载速度"
            class="inputor"
            size="large"
            @blur="handleUpdateSpeed('Z轴满载速度')"
            @keypress="input_filter"
          ></el-input>
          <span class="label">R轴满载速度：</span>
          <el-input
            v-model="allSpeed.R轴满载速度"
            class="inputor"
            size="large"
            @blur="handleUpdateSpeed('R轴满载速度')"
            @keypress="input_filter"
          ></el-input>
        </div>
        <div class="form-item">
          <span class="label">XYZR自动速度百分比</span>
          <span></span>
          <el-slider
            v-model="allSpeed.XYZR自动速度百分比"
            show-input
            size="large"
            style="width: 80%"
            @change="handleUpdateSpeed('XYZR自动速度百分比')"
          />
        </div>
      </el-collapse-item>
      <el-collapse-item title="模组点位一键写入" name="2">
        <!-- <div style="height: 500px; overflow: auto">
          <div style="display: flex; flex-wrap: wrap; gap: 5px; width: 100%; margin-bottom: 5px">
            <el-tag
              v-for="item in statesList"
              :key="item.key"
              :type="item.value === true ? 'primary' : 'info'"
            >
              {{ item.key }}
            </el-tag>
          </div>
          <div class="button-group">
            <el-button
              v-for="item in commands1"
              :key="item"
              type="primary"
              size="large"
              :disabled="!statusStore.switchStatus"
              @mousedown="onSetSport(item, 1)"
              @mouseup="onSetSport(item, 2)"
            >
              {{ item }}
            </el-button>
            <el-button
              v-for="item in commands2"
              :key="item"
              type="success"
              size="large"
              :disabled="!statusStore.switchStatus"
              @mousedown="onSetSport(item, 1)"
              @mouseup="onSetSport(item, 2)"
            >
              {{ item }}
            </el-button>
            <el-button
              v-for="item in commands5"
              :key="item"
              type="primary"
              size="large"
              color="#6D8B3A"
              :style="{ color: 'white' }"
              :disabled="!statusStore.switchStatus"
              @touchstart="onSetSport(item, 1)"
            >
              {{ item }}
            </el-button>
          </div>
          <div class="button-group" style="margin-top: 10px">
            <el-button
              v-for="(item, index) in commands.group4"
              :key="item.action"
              :type="item.status ? 'primary' : 'default'"
              size="large"
              :style="{
                backgroundColor: item.status ? '#4A6FB1' : '#B0C4DE', // 浅蓝色
                color: 'white',
                borderColor: item.status ? '#4A6FB1' : '#B0C4DE'
              }"
              :disabled="!statusStore.switchStatus"
              @touchstart="onSetSport(item.action, 1, index, 'group4')"
              @mousedown="onSetSport(item.action, 1, index, 'group4')"
            >
              {{ item.action }}
            </el-button>
          </div>

          <div class="button-group">
            <el-button
              v-for="(item, index) in commands.group3"
              :key="item.action"
              :type="item.status ? 'warning' : 'default'"
              size="large"
              :style="{
                backgroundColor: item.status ? '#F39C12' : '#F1C40F', // 浅黄色
                color: 'white',
                borderColor: item.status ? '#F39C12' : '#F1C40F'
              }"
              :disabled="!statusStore.switchStatus"
              @touchstart="onSetSport(item.action, 1, index, 'group3')"
              @mousedown="onSetSport(item.action, 1, index, 'group3')"
            >
              {{ item.action }}
            </el-button>
            <el-button
              v-for="(item, index) in commands.group2"
              :key="item.action"
              :type="item.status ? 'warning' : 'default'"
              size="large"
              :style="{
                backgroundColor: item.status ? '#F39C12' : '#F1C40F', // 浅黄色
                color: 'white',
                borderColor: item.status ? '#F39C12' : '#F1C40F'
              }"
              :disabled="!statusStore.switchStatus"
              @touchstart="onSetSport(item.action, 1, index, 'group2')"
              @mousedown="onSetSport(item.action, 1, index, 'group2')"
            >
              {{ item.action }}
            </el-button>
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              margin-left: 10px;
              gap: 10px;
              margin-bottom: 10px;
            "
          >
            <span>XYZR手动速度百分比：</span
            ><el-slider v-model="value" show-input style="width: 300px" size="large" />
            <el-button type="primary" size="large" @click="statusStore.handleSwitch">{{
              statusStore.switchStatus === true ? '手动' : '自动'
            }}</el-button>
          </div>
          <div style="display: flex; gap: 5px">
            <panel></panel>
            <panel></panel>
            <panel></panel>
            <panel></panel>
          </div>
          <div style="display: flex; gap: 5px">
            <panel></panel>
          </div>
        </div> -->
        <div class="form-item">
          <el-space size="large">
            <el-card style="max-width: 320px">
              <div :style="{
                fontSize: '24px',
                margin: '0px 10px 10px 0px'
              }"><b>入柜区</b></div>
              <div class="label margin-inside-card">
                <span>库位水平间隔距离 </span>
                <el-input class="inputor" size="large" v-model="allRegionProps.入柜区.水平距离"
                @blur="onSetRegionProp('入柜区', '水平距离')"
                @keypress="input_filter"
                ></el-input>
              </div>
              <div class="label margin-inside-card">
                <span>库位竖直间隔距离 </span>
                <el-input class="inputor" size="large" v-model="allRegionProps.入柜区.竖直距离"
                @blur="onSetRegionProp('入柜区', '竖直距离')"
                @keypress="input_filter"
                ></el-input>
              </div>
              <div class="margin-inside-card">
                <el-button class="button" type="warning" size="large">库位坐标一键写入</el-button>
              </div>
            </el-card>

            <el-card style="max-width: 320px">
              <div :style="{
                fontSize: '24px',
                margin: '0px 10px 10px 0px'
              }"><b>冷藏区</b></div>
              <div class="label margin-inside-card">
                <span>库位水平间隔距离 </span>
                <el-input class="inputor" size="large" v-model="allRegionProps.冷藏区.水平距离"
                @blur="onSetRegionProp('冷藏区', '水平距离')"
                @keypress="input_filter"
                ></el-input>
              </div>
              <div class="label margin-inside-card">
                <span>库位竖直间隔距离 </span>
                <el-input class="inputor" size="large" v-model="allRegionProps.冷藏区.竖直距离"
                @blur="onSetRegionProp('冷藏区', '竖直距离')"
                @keypress="input_filter"
                ></el-input>
              </div>
              <div class="margin-inside-card">
                <el-button class="button" type="warning" size="large">库位坐标一键写入</el-button>
              </div>
            </el-card>

            <el-card style="max-width: 320px">
              <div :style="{
                fontSize: '24px',
                margin: '0px 10px 10px 0px'
              }"><b>回温区</b></div>
              <div class="label margin-inside-card">
                <span>库位水平间隔距离 </span>
                <el-input class="inputor" size="large" v-model="allRegionProps.回温区.水平距离"
                @blur="onSetRegionProp('回温区', '水平距离')"
                @keypress="input_filter"
                ></el-input>
              </div>
              <div class="label margin-inside-card">
                <span>库位竖直间隔距离 </span>
                <el-input class="inputor" size="large" v-model="allRegionProps.回温区.竖直距离"
                @blur="onSetRegionProp('回温区', '竖直距离')"
                @keypress="input_filter"
                ></el-input>
              </div>
              <div class="margin-inside-card">
                <el-button class="button" type="warning" size="large">库位坐标一键写入</el-button>
              </div>
            </el-card>

            <el-card style="max-width: 320px">
              <div :style="{
                fontSize: '24px',
                margin: '0px 10px 10px 0px'
              }"><b>待取区</b></div>
              <div class="label margin-inside-card">
                <span>库位水平间隔距离 </span>
                <el-input class="inputor" size="large" v-model="allRegionProps.待取区.水平距离"
                @blur="onSetRegionProp('待取区', '水平距离')"
                @keypress="input_filter"
                ></el-input>
              </div>
              <div class="label margin-inside-card">
                <span>库位竖直间隔距离 </span>
                <el-input class="inputor" size="large" v-model="allRegionProps.待取区.竖直距离"
                @blur="onSetRegionProp('待取区', '竖直距离')"
                @keypress="input_filter"
                ></el-input>
              </div>
              <div class="margin-inside-card">
                <el-button class="button" type="warning" size="large">库位坐标一键写入</el-button>
              </div>
            </el-card>
          </el-space>
        </div>
        <div class="form-item">
          <div class="label margin-inside-card">
            <span>冷藏区1起始库位角度：</span>
            <el-input class="inputor" size="large" v-model="allRegionProps.冷藏区.区1角度"
            @blur="onSetRegionProp('冷藏区', '区1角度')"
            @keypress="input_filter"
            ></el-input>
          </div>
          <div class="label margin-inside-card">
            <span>冷藏区2起始库位角度：</span>
            <el-input class="inputor" size="large" v-model="allRegionProps.冷藏区.区2角度"
            @blur="onSetRegionProp('冷藏区', '区2角度')"
            @keypress="input_filter"
            ></el-input>
          </div>
          <div class="label margin-inside-card">
            <span>锡膏柜型号：</span>
            <el-input class="inputor" size="large"
            @keypress="input_filter"
            ></el-input>
          </div>
        </div>

      </el-collapse-item>
    </el-collapse>
    <div class="store-out-panel"></div>

    <div style="padding: 20px"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import panel from './components/panel.vue'
import movementApi from '@renderer/api/movement/index'
import { ElMessage } from 'element-plus'
import useStatusStore from '@renderer/store/modules/status'

const statusStore = useStatusStore()
const loading = ref(true)
const statesList = ref<{ key: string; value: boolean }[]>([])
const commands1 = ['三色灯黄', '三色灯绿', '三色灯红', '三色灯蜂鸣']
const commands2 = ['入库门打开', '出库门打开']
const commands5 = ['扫码旋转电机动作', '搅拌电机动作']

type CommandStatus = {
  action: string
  status: boolean
}
const commands = ref<{ group3: CommandStatus[]; group4: CommandStatus[]; group2: CommandStatus[] }>(
  {
    group3: [
      { action: '冰箱门推拉动作', status: true },
      { action: '冰箱门推拉复位', status: true },
      { action: '冰箱门滑台动作', status: true },
      { action: '冰箱门滑台复位', status: true }
    ],
    group4: [
      { action: '模组夹爪气缸动作', status: true },
      { action: '模组夹爪气缸复位', status: true },
      { action: '模组180度旋转气缸动作', status: true },
      { action: '模组180度旋转气缸复位', status: true },
      { action: '模组45度旋转气缸动作', status: true },
      { action: '模组45度旋转气缸复位', status: true }
    ],
    group2: [
      { action: '出库滑台动作', status: true },
      { action: '出库滑台复位', status: true }
    ]
  }
)

const updateStatus = (data) => {
  // 遍历所有 group
  Object.keys(commands.value).forEach((groupKey) => {
    commands.value[groupKey].forEach((item) => {
      // 根据 data 中的值更新状态
      if (data[item.action] !== undefined) {
        item.status = data[item.action]
      }
    })
  })
}

const getButtonGroupStatueList = () => {
  movementApi.getSportStates2().then((res: any) => {
    if (res.code === 0) {
      updateStatus(res.data)
    } else {
      ElMessage({
        message: res.data,
        type: 'error',
        duration: 3000 // 显示时长，默认3000ms
      })
    }
  })
}

const getList = () => {
  loading.value = true
  movementApi
    .getSportStates()
    .then((res: any) => {
      loading.value = false
      if (res.code === 0) {
        // statesList.value = res.data
        statesList.value = []
        let formattedData = res.data.replace(/True/g, 'true').replace(/False/g, 'false')
        formattedData = formattedData.replace(/'/g, '"')
        const dataObject = JSON.parse(formattedData)
        for (const key in dataObject) {
          statesList.value.push({ key: key.split('_')[1], value: res.data[key] })
        }
      }
    })
    .catch((err) => {
      loading.value = false
      console.log(err)
    })
}

const onSetSport = (action: string, tag: number, index?: number, groupId?: string) => {
  if (!statusStore.switchStatus) {
    // 如果 switchStatus 为 false，阻止执行
    return
  }
  movementApi.setSport(action, tag).then((res: any) => {
    if (res.code === 0) {
      ElMessage({
        message: '操作成功！',
        type: 'success',
        duration: 3000 // 显示时长，默认3000ms
      })
      if (index && groupId) {
        commands.value[groupId][index].status = res.data
      }
      getList()
    } else {
      ElMessage({
        message: res.data,
        type: 'error',
        duration: 3000 // 显示时长，默认3000ms
      })
    }
  })
}

const allRegionProps = ref({
  入柜区: {
    水平距离: "1",
    竖直距离: "2",
  },
  冷藏区: {
    水平距离: "3",
    竖直距离: "4",
    区1角度: "9",
    区2角度: "10",
  },
  回温区: {
    水平距离: "5",
    竖直距离: "6",
  },
  待取区: {
    水平距离: "7",
    竖直距离: "8",
  },
})

const input_filter = e => ['0','1','2','3','4','5','6','7','8','9','.'].includes(e.key) || e.preventDefault()

const getAllRegionProps = () => {
  movementApi.getRegionProp().then((res: any) => {
    if (res.code === 0) {
      allRegionProps.value = res.data
    } else {
      ElMessage({
        message: res.data,
        type: "error",
        duration: 3000,
      })
    }
  })
}

const onSetRegionProp = (region: string, prop: string) => {
  if (!statusStore.switchStatus) {
    return
  }
  movementApi.setRegionProp(
    {
      "region": region,
      "prop": prop,
      "value": Number(allRegionProps.value[region][prop])
    }
  ).then((res: any) => {
    if (res.code === 0) {
      ElMessage({
        message: "操作成功！",
        type: "success",
        duration: 3000,
      })
    } else {
      ElMessage({
        message: res.data,
        type: "error",
        duration: 3000,
      })
    }
  })
}

const allSpeed = ref({
  X轴满载速度: 0,
  Y轴满载速度: 0,
  Z轴满载速度: 0,
  R轴满载速度: 0,
  XYZR自动速度百分比: 0
})

const getSpeedList = () => {
  movementApi.getSpeed().then((res: any) => {
    if (res.code === 0) {
      allSpeed.value = res.data
    } else {
      ElMessage({
        message: res.data,
        type: 'error',
        duration: 1000 // 显示时长，默认3000ms
      })
    }
  })
}

const handleUpdateSpeed = (type: string) => {
  movementApi.tunedSpeed({ type: type, value: Number(allSpeed.value[type]) }).then((res: any) => {
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

onMounted(() => {
  getList()
  getSpeedList()
  getButtonGroupStatueList()
  getAllRegionProps()
  statusStore.getSwitchStatus()
})

const value = ref('')

const activeName = ref(['1', '2'])
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

.panel-item {
  display: flex;
  gap: 5px;
  margin-bottom: 5px;
  justify-content: space-between;
  align-items: center;
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

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
  margin-bottom: 10px;
}

.form-item {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  gap: 10px; /* 标签与选择器之间的间距 */
  margin-top: 20px;
  margin-left: 20px;

  .inputor {
    width: 240px;
    margin: 8px;
  }
}

.label {
  font-size: 20px;
  min-width: 100px; /* 确保宽度一致，便于对齐 */
  // text-align: right;
}

.button {
  font-size: 20px;
  // background-color: #F39C12; 浅黄色
  color: white;
  // border-color: #F39C12;
  height: 100%;
  margin: 4px;
}

.margin-inside-card {
  margin: 20px 5px 0px 0px;
}
</style>
