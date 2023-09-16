import { defineStore } from 'pinia'
import { getStore, removeStore, setStore } from '@/utils/storage'
import { User, UserState, defaultUser } from './types'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: getStore('userInfo') || defaultUser
  }),

  getters: {
    userName(state: UserState): string {
      return state.user.name
    }
  },

  actions: {
    // Get user's information
    async info() {
      // this.name,this.avatar
      // const res = await getUserInfo()
      // this.setInfo(res.data)
    },

    // Login
    async login(info: User) {
      this.user = info
      setStore('userInfo', info)
      // const res = await userLogin(loginForm)
      // setToken(res.data.token)
    },

    logout() {
      this.user = defaultUser
      removeStore('userInfo')
      removeStore('token')
    }
  }
})
