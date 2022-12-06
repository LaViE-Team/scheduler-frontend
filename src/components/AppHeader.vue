<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.dispatch('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderNav class="ms-auto align-items-center">
        <a class="mx-2" @click="logout" role="button">Logout</a>
        <span class="mx-4" style="font: 12">Nguyen Van A</span>
        <font-awesome-icon icon="fa-solid fa-user" size="2x" />
      </CHeaderNav>
    </CContainer>
  </CHeader>
</template>

<script>
// import AppBreadcrumb from './AppBreadcrumb'
import avatar from '@/assets/images/avatars/8.jpg'
// import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
export default {
  name: 'AppHeader',
  components: {
    // AppBreadcrumb,
    // AppHeaderDropdownAccnt,
  },
  setup() {
    return {
      avatar,
    }
  },
  methods: {
    logout() {
      this.$router.push({ name: 'Login' })
    },
  },
}
</script>
