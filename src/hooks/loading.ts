import { App, createApp } from 'vue'
import appLoading from '@/components/appLoading/index.vue'

export function useLoading() {
  let app: App
  let div: HTMLDivElement
  let loadingFlag = false

  const loading = () => {
    app = createApp(appLoading)
    div = document.createElement('div')
    app.mount(div)
    document.body.append(div)
    loadingFlag = true
  }

  const clear = () => {
    app && app.unmount()
    div && div.remove()
    loadingFlag = false
  }

  const isLoading = () => {
    return loadingFlag
  }

  return {
    loading,
    clear,
    isLoading
  }
}