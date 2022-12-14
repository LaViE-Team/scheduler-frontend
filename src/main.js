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
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Loading from '@/components/Common/Loading.vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsExample from '@/components/DocsExample'
import vue3GoogleLogin from 'vue3-google-login'
import { initFacebookSdk } from './services/fbsdk'

initFacebookSdk()

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
app.component('font-awesome-icon', FontAwesomeIcon)
app.provide('icons', icons)
app.component('Multiselect', Multiselect)
app.component('Loading', Loading)
app.component('CIcon', CIcon)
app.component('DocsExample', DocsExample)

app.mount('#app')
