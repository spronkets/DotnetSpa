import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import customerStore from './stores/customerStore'
import { customerServicePlugin } from './services/customerService'

const app = createApp(App)

app.use(customerStore)
app.use(customerServicePlugin)
app.use(router)

app.mount('#app')
