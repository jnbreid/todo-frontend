import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'

import PrimeVue from 'primevue/config'

// PrimeVue styles
import 'primevue/resources/themes/saga-blue/theme.css'  // Theme (light)
import 'primevue/resources/primevue.min.css'            // Core PrimeVue styles
import 'primeicons/primeicons.css'                      // Icons

import './assets/main.css'


const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(PrimeVue)
app.mount('#app')