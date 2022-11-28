<template>
  <CButton class="px-8" color="danger" size="lg" @click="onSubmit">
    <span>SIGN IN WITH GMAIL</span>
  </CButton>
</template>
<script>
import { loginGG } from '@/services/auth'

export default {
  name: 'BtnGmail',
  methods: {
    onSubmit() {
      loginGG()
    },
  },
}
</script>
