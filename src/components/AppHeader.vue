<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.dispatch('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderNav class="ms-auto align-items-center">
        <a class="mx-2" @click="logout" role="button" style="font-size: 20px"
          >Logout</a
        >
        <span class="mx-4" style="font-size: 20px">{{ user_name }}</span>
        <font-awesome-icon icon="fa-solid fa-user" size="2x" />
      </CHeaderNav>
    </CContainer>
  </CHeader>
</template>

<script>
// import AppBreadcrumb from './AppBreadcrumb'
import avatar from '@/assets/images/avatars/8.jpg'
// import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
import { getUserName, removeAccessToken, removeUserName } from '@/utils/cookies'
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'

export default {
  name: 'AppHeader',
  components: {
    // AppBreadcrumb,
    // AppHeaderDropdownAccnt,
  },
  setup() {
    const user_name = ref(String)
    const store = useStore()

    return {
      avatar,
      user_name,
      store,
    }
  },
  methods: {
    async logout() {
      await removeAccessToken()
      await removeUserName()
      this.$store.dispatch('setSubjects', [])
      this.$router.push({ name: 'Login' })
    },
  },
  created() {
    this.user_name = getUserName()
  },
}
</script>
