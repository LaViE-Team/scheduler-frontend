<template>
  <CButton class="px-8" color="danger" size="lg" @click="onSubmit">
    <span>SIGN IN WITH GMAIL</span>
  </CButton>
</template>
<script>
export default {
  name: 'BtnGmail',
  methods: {
    onSubmit() {
      console.log(1)
    },
  },
}
</script>
