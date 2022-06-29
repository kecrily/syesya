import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import App from './App.vue'

import 'uno.css'
import '@unocss/reset/antfu.css'

const app = createApp(App)
const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
const pinia = createPinia()
pinia.use(piniaPersist)

app.use(router)
app.use(pinia)
app.mount('#app')
