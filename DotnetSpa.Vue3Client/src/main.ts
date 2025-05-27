import { createApp } from 'vue'
import App from './app.vue'
import router from './router'
import customerStore from './stores/customer-store'
import { customerServicePlugin } from './services/customer-service'

const app = createApp(App)

app.use(customerStore)
app.use(customerServicePlugin)
app.use(router)

app.mount('#app')
