import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./routes/routes.js";

const app = createApp(App)
app.use(router)
app.mount('#app')

import DefaultLayout from "./layouts/DefaultLayout.vue";
import NoLayout from "./layouts/NoLayout.vue";

app.component('default-layout', DefaultLayout)
app.component('no-layout', NoLayout)