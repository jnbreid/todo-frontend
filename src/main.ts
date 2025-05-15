import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'


import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Card from 'primevue/card'

// PrimeVue styles
import 'primevue/resources/themes/saga-blue/theme.css'  // Theme (light)
import 'primevue/resources/primevue.min.css'            // Core PrimeVue styles
import 'primeicons/primeicons.css'                      // Icons

import './assets/main.css'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(PrimeVue)


app.component('InputText', InputText)
app.component('Button', Button)
app.component('Card', Card)

app.mount('#app')