import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => {
    return {
      addressId: '' as ID,
    }
  },
  actions: {
  },
  persist: false,
})
