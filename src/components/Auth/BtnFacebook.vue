<template>
  <CButton class="px-8" color="primary" size="lg" @click="onSubmit">
    <span>SIGN IN WITH FACEBOOK</span>
  </CButton>
</template>
<script>
// import { loginFB } from '@/services/auth'

export default {
  name: 'BtnFacebook',
  methods: {
    async onSubmit() {
      await window.FB.login()
      await window.FB.getLoginStatus(({ authResponse }) => {
        if (authResponse) {
          console.log(authResponse)
        }
      })
    },
  },
}
</script>
