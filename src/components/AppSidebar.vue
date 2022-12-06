<template>
  <CSidebar
    position="fixed"
    :visible="sidebarVisible"
    @visible-change="
      (event) =>
        $store.dispatch({
          type: 'updateSidebarVisible',
          value: event,
        })
    "
  >
    <CSidebarBrand class="bg-white">
      <img
        :src="logo"
        class="img-fluid sidebar-brand-full"
        style="width: 500px; height: auto"
      />
      <img :src="logoSquare" class="img-fluid sidebar-brand-narrow" />
    </CSidebarBrand>
    <AppSidebarNav />
  </CSidebar>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { AppSidebarNav } from './AppSidebarNav'
import logo from '@/assets/images/vue.jpg'
import logoSquare from '@/assets/images/vue400.jpg'

export default {
  name: 'AppSidebar',
  components: {
    AppSidebarNav,
  },
  setup() {
    const store = useStore()
    return {
      logo,
      logoSquare,
      sidebarVisible: computed(() => store.getters.sidebarVisible),
    }
  },
}
</script>
