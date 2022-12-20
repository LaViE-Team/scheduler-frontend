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
                v-model="oldPassword"
                type="password"
                id="inputPassword"
                required
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
                v-model="newPassword"
                type="password"
                id="inputConfirmPassword"
                required
              />
            </div>
          </CRow>
          <CRow class="my-4 justify-content-center">
            <div class="col-sm-7 text-center">
              <CButton
                type="submit"
                color="primary"
                class="min-update-width"
                @click.prevent="handleUpdate"
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
import { getUserName } from '@/utils/cookies'
import { ref } from '@vue/reactivity'
import { useToast } from 'vue-toastification'
import { changePassword } from '@/services/acount'

export default {
  name: 'Schedule',
  setup() {
    const username = ref('')
    const oldPassword = ref('')
    const newPassword = ref('')
    const dob = ref('')
    const toast = useToast()

    return {
      username,
      oldPassword,
      newPassword,
      dob,
      toast,
    }
  },
  methods: {
    async handleUpdate() {
      console.log()
      try {
        const response = await changePassword({oldPassword:this.oldPassword,newPassword:this.newPassword})
        this.toast.success('Success')
        this.oldPassword = ""
        this.newPassword = ""
        // this.$store.dispatch('setSchedules', response)
        // console.log(this.$store.getters.schedules)
        // console.log(this.reformatedSubject)
      } finally {
        // this.isLoading = false
        // this.$router.push({ name: 'ScheduleInfo' })
      }
      // await console.log('update')
    },
  },
  created() {
    this.username = getUserName()
  }
}
</script>

<style scoped>
button.min-update-width {
  min-width: 100px;
}
</style>
