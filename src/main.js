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

const app = createApp(App)
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
