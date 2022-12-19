<template>
  <CButton class="px-8" color="danger" size="lg" @click="login">
    <span>SIGN IN WITH GMAIL</span>
  </CButton>
</template>
<script>
import { loginGG } from '@/services/auth'
import { ref } from '@vue/reactivity'
import { googleTokenLogin } from 'vue3-google-login'
import { setAccessToken, setUserName } from '@/utils/cookies'

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
      await googleTokenLogin().then(async (response) => {
        try {
          const res = await loginGG({ access_token: response.access_token })

          if (res) {
            setAccessToken(res.access_token, {
              expires: new Date(Date.now() + res.expires_in * 1000),
            })

            setUserName(res.user_info.username)

            this.$router.replace({ name: 'Home' })
          }
        } catch (e) {
          console.log(e)
        }
      })
    },
  },
}
</script>
