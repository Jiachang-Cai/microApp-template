import '@/assets/style/index.less'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import microApp from '@micro-zoe/micro-app'

microApp.start({
  'router-mode': 'pure'
})

const app = createApp(App)

app.use(router)

app.mount('#app')
