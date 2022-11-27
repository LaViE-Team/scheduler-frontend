<template>
  <CButton class="px-8" color="primary" size="lg" @click="onSubmit">
    <span>SIGN IN WITH FACEBOOK</span>
  </CButton>
</template>
<script>
export default {
  name: 'BtnFacebook',
  methods: {
    onSubmit() {
      console.log(1)
    },
  },
}
</script>
