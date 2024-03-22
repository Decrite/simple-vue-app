import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Camera from 'simple-vue-camera'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('camera', Camera)

app.mount('#app')
