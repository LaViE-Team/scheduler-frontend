<template>
  <div>
    <CCard class="p-5">
      <CCardBody>
        <CForm>
          <CRow class="mb-3 justify-content-center">
            <CFormLabel class="col-sm-2 col-form-label fw-semibold">
              Username
            </CFormLabel>
            <div class="col-sm-4">
              <CFormInput type="text" :value="username" readonly plain-text />
            </div>
          </CRow>
          <CRow class="mb-3 justify-content-center">
            <CFormLabel
              for="inputPassword"
              class="col-sm-2 col-form-label fw-semibold"
            >
              Password
            </CFormLabel>
            <div class="col-sm-4">
              <CFormInput
                type="password"
                id="inputPassword"
                required
                :value="password"
              />
            </div>
          </CRow>
          <CRow class="mb-3 justify-content-center">
            <CFormLabel
              for="inputConfirmPassword"
              class="col-sm-2 col-form-label fw-semibold"
            >
              Confirm Password
            </CFormLabel>
            <div class="col-sm-4">
              <CFormInput
                type="password"
                id="inputConfirmPassword"
                required
                :value="password"
              />
            </div>
          </CRow>
          <CRow class="mb-3 justify-content-center">
            <CFormLabel class="col-sm-2 col-form-label fw-semibold">
              DOB.
            </CFormLabel>
            <div class="col-sm-4">
              <CFormInput type="date" required />
            </div>
          </CRow>
          <CRow class="my-4 justify-content-center">
            <div class="col-sm-7 text-center">
              <CButton
                type="submit"
                color="primary"
                class="min-update-width"
                @click="handleUpdate"
              >
                Update
              </CButton>
            </div>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'

export default {
  name: 'Schedule',
  setup() {
    const username = ref('username')
    const password = ref('password')
    const dob = ref('')

    return {
      username,
      password,
      dob,
    }
  },
  methods: {
    handleUpdate() {
      console.log('update')
    },
  },
}
</script>

<style scoped>
button.min-update-width {
  min-width: 100px;
}
</style>
