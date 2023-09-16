import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/tailwind.css'
import './samples/node-api'
import router from './router'
import '@arco-design/web-vue/dist/arco.css'

const pinia = createPinia()
createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
