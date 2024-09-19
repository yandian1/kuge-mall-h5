import { defineStore } from 'pinia'
import * as authApi from '@/api/auth'
import * as AuthTypes from '@/api/auth/types'
import * as cartApi from '@/api/cart'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      user: {} as AuthTypes.LoginRes['user'],
      cartCount: 0,
      searchHistory: [] as string[]
    }
  },
  actions: {
    login(params: Recordable) {
      return authApi
        .login(params)
        .then((res) => {
          const { token, cartCount , user } = res.data.data
          this.token = token
          this.cartCount = cartCount
          this.user = user
          return res
        })
        .catch((error) => {
          return Promise.reject(error)
        })
    },

    register(params: Recordable) {
      return authApi
        .register(params)
        .then((res) => {
          const { token, user } = res.data.data
          this.token = token
          this.user = user
          return res
        })
        .catch((error) => {
          return Promise.reject(error)
        })
    },

    logout() {
      return authApi
        .logout()
        .then(() => {
          this.$reset()
        })
        .catch((error) => {
          return Promise.reject(error)
        })
    },

    addSearchHistory(str: string) {
      !this.searchHistory.includes(str) && this.searchHistory.push(str)
    },

    removeSearchHistory() {
      this.searchHistory =[]
    },

    getCartCount() {
      return cartApi
        .getCartCount()
        .then((res) => {
          this.cartCount = res.data.data
          return res
        })
        .catch((error) => {
          return Promise.reject(error)
        })
    },
  },
  persist: true,
})
