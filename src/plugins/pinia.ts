import { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const piniaInstance = createPinia()
piniaInstance.use(piniaPluginPersistedstate)

export function pinia(app: App) {
  app.use(piniaInstance)
}
