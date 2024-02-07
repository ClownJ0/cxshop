
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import useCountDown from '@/utils/useCountDown'
import http from '@/api/request'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.config.globalProperties.$countDown = useCountDown;
app.config.globalProperties.$http = http;
app.use(createPinia())
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })

app.mount('#app')
