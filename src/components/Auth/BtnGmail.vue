<template>
  <CButton class="px-8" color="danger" size="lg" @click="login">
    <span>SIGN IN WITH GMAIL</span>
  </CButton>
</template>
<script>
import { loginGG } from '@/services/auth'
import { ref } from '@vue/reactivity'
import { googleTokenLogin } from 'vue3-google-login'

export default {
  name: 'BtnGmail',
  setup() {
    const user = ref({})
    return {
      user,
    }
  },
  methods: {
    async login() {
      await googleTokenLogin().then((response) => {
        loginGG({ access_token: response.access_token })
      })
      this.$router.replace({ name: 'Home' })
    },
  },
}
</script>
