<template>
  <CButton class="px-8" color="primary" size="lg" @click="onSubmit">
    <span>SIGN IN WITH FACEBOOK</span>
  </CButton>
</template>
<script>
import { loginFB } from '@/services/auth'

export default {
  name: 'BtnFacebook',
  methods: {
    onSubmit() {
      loginFB()
    },
  },
}
</script>
