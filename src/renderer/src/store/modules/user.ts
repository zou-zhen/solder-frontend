import { setToken, clearToken } from '@renderer/utils/auth'
import { defineStore } from 'pinia'
import user from '@renderer/api/auth/user'
import { LoginData, LoginResult } from '@renderer/api/auth/types'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    info: {}
  }),
  getters: {
    isLogin: (state) => {
      let retn = false
      if (state.token) {
        retn = true
      }
      return retn
    }
  },
  actions: {
    async login(data: LoginData) {
      console.log(data)

      const res: any = await user.login(data)
      if (res) {
        const { data } = res
        console.log(res)

        setToken(data.token) // Save token to localstorage
        this.token = data.accessToken
      }

      return res
    },
    async getInfo(data: LoginResult) {
      console.log(data)

      const res: any = await user.getUserInfo()
      // if (res) {
      //   const { data } = res
      //   console.log('data', data)
      // }
      return res
    },
    logout() {
      clearToken()
      console.log('logout')
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
export default useUserStore
