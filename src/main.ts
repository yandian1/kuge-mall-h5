import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import plugins from '@/plugins'
import '@/style/index.less'

plugins(createApp(App)).use(router).mount('#app')
