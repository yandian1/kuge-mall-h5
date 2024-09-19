import { App } from 'vue'
import { vant } from './vant'
import { pinia } from './pinia'
import { globComp } from './globComp'

export default function plugins(app: App) {
  vant(app)
  pinia(app)
  globComp(app)
  return app
}
