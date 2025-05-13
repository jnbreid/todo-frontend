import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import './assets/main.css'

import PrimeVue from 'primevue/config'

// PrimeVue styles
import 'primevue/resources/themes/saga-blue/theme.css'      // or any other theme
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'



const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(PrimeVue)
app.mount('#app')