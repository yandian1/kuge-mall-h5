import axios from 'axios'
import router from '@/router'
import { showToast } from 'vant'
import { useUserStore } from '@/store/user'

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  showError: true,
})

request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = 'Bearer ' + userStore.token
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (res) => {
    const userStore = useUserStore()
    const {
      data: { code, msg },
      config,
    } = res
    if (code !== 0) {
      if (code === 401) {
        userStore.$reset()
        router.push('/login')
        return Promise.reject(res)
      }

      if (config.showError) {
        showToast({
          message: msg,
          type: 'text',
        })
      }
      return Promise.reject(res)
    }
    return res
  },
  (error) => {
    if (error.config.showError) {
      showToast({
        message: error.message,
        type: 'text',
      })
    }
    return Promise.reject(error)
  }
)

export default request
