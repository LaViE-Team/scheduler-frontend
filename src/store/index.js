import { createStore } from 'vuex'
import sidebar from './sidebar'
import subject from './subject'

export default createStore({
  modules: {
    sidebar,
    subject,
  },
})
