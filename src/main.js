import axios from 'axios'
window.axios = axios
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import 'nprogress/nprogress.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { iconsSet as icons } from '@/assets/icons'
import DocsExample from '@/components/DocsExample'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)
app.use(vue3GoogleLogin, {
  clientId: process.env.VUE_APP_GG_CLIENT_ID,
})
app.use(store)
app.use(router)
app.use(CoreuiVue)
app.use(Toast, {
  pauseOnFocusLoss: false,
  hideProgressBar: true,
})
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsExample', DocsExample)

app.mount('#app')
