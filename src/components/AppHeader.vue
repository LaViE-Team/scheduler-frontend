<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.dispatch('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderNav class="ms-auto">
        <a class="mx-2" @click="logout" role="button">Logout</a>
        <span class="mx-2">Nguyen Van A</span>
        <CIcon class="mx-2" icon="cil-user" size="lg" />
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
