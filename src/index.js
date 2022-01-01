// DEPRECATED
// MOVED TO STACKBLITZ:
// https://stackblitz.com/edit/feathersjs-ebux7j
// Why?
// 1. Too many bugs here.
// 2. SSE is too Slow compared to WebContainers

import { createApp } from 'vue'
import App from './App.vue'
import { store, FeathersVuex } from './store'
import { createVuetify } from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

const app = createApp(App)
app.use(store)
app.use(FeathersVuex)
app.use(createVuetify())

app.mount('#app')

// Report issues here https://bit.ly/2uYOZ7t
