import './assets/main.css'
import "uno.css";

import { createApp } from 'vue'
import i18n from '@/plugins/vueI18n'
import { setupStore } from '@/store'

import App from './App.vue'
import router from './router'


const app = createApp(App)
app.use(i18n)
setupStore(app)
app.use(router)
app.mount('#app')
