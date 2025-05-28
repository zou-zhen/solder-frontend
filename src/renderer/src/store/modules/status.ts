import { defineStore } from 'pinia'
import movementApi from '@renderer/api/movement/index'
import systemApi from '@renderer/api/system'
import { ElMessage } from 'element-plus'

const onSetSport = (action: string, tag: number) => {
  movementApi.setSport(action, tag).then((res: any) => {
    if (res.code === 0) {
      ElMessage({
        message: '操作成功！',
        type: 'success',
        duration: 3000 // 显示时长，默认3000ms
      })

      // getList()
    } else {
      ElMessage({
        message: res.data,
        type: 'error',
        duration: 3000 // 显示时长，默认3000ms
      })
    }
  })
}

export const useStatusStore = defineStore('status', {
  state: () => ({
    switchStatus: true,
    mode: 1 as 0 | 1,
    is_stiring: false,
    isType360: false,
  }),
  getters: {
    modeName(state) {
      let name = '日常模式'
      switch (state.mode) {
        case 0:
          name = '冷藏模式'
          break
        case 1:
          name = '日常模式'
          break
        case 2:
          name = '预约模式'
          break
      }
      return name
    }
  },
  actions: {
    async getSwitchStatus() {
      await movementApi.getAuto().then((res: any) => {
        if (res.code === 0) {
          this.switchStatus = res.data
        } else {
          ElMessage({
            message: res.data,
            type: 'error',
            duration: 3000 // 显示时长，默认3000ms
          })
        }
      })
    },
    async handleSwitch() {
      await movementApi.switchAuto().then((res: any) => {
        if (res.code === 0) {
          this.switchStatus = res.data
          ElMessage({
            message: '切换成功！',
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
    },
    async getMode() {
      systemApi.readMode().then((res: any) => {
        if (res.code === 0) {
          this.mode = res.data
        } else {
          ElMessage({
            message: res.data,
            type: 'error',
            duration: 1000 // 显示时长，默认3000ms
          })
        }
      })
    },
    async updataMode(mode: 0 | 1 | 2) {
      systemApi.writeMode({ mode }).then((res: any) => {
        if (res.code === 0) {
          ElMessage({
            message: '模式修改成功！',
            type: 'success',
            duration: 1000 // 显示时长，默认3000ms
          })
          this.mode = mode
          if (this.mode === 0) {
            onSetSport('一键冷藏按钮', 1)
            onSetSport('一键冷藏按钮', 2)
          }
        } else {
          ElMessage({
            message: res.data,
            type: 'error',
            duration: 1000 // 显示时长，默认3000ms
          })
        }
      })
    },
    async getIsStiring() {
      await movementApi.getIsStiring().then((res: any) => {
        if (res.code === 0) {
          this.is_stiring = res.data
        } else {
          ElMessage({
            message: res.data,
            type: 'error',
            duration: 3000 // 显示时长，默认3000ms
          })
        }
      })
    },
    async switchType() {
      this.isType360 = !this.isType360
    }
  }
})

/**
 * 用于在组件外部（如在Pinia Store 中）使用 Pinia 提供的 store 实例。
 * 官方文档解释了如何在组件外部使用 Pinia Store：
 * https://pinia.vuejs.org/core-concepts/outside-component-usage.html#using-a-store-outside-of-a-component
 */
// export function useUserStoreHook() {
//   return useUserStore(store)
// }
export default useStatusStore
