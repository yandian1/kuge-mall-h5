import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      pageSkeleton: false,
      pageError: '',
    }
  },
  actions: {
  },
})
