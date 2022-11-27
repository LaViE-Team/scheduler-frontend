import { createStore } from 'vuex'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
  },
  actions: {
    toggleSidebar(context) {
      return context.commit('toggleSidebar')
    },
    toggleUnfoldable(context) {
      return context.commit('toggleUnfoldable')
    },
    updateSidebarVisible(context, payload) {
      return context.commit('updateSidebarVisible', {
        ...payload,
      })
    },
  },
  modules: {},
})
