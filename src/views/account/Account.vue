<template>
  <div>
    <CCard class="p-5">
      <CCardBody>
        <Form ref="myForm" as="CForm" v-slot="{ errors }" @submit="handleUpdate" :validation-schema="schema">
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
              <Field
                as="CFormInput"
                name="oldPassword"
                type="password"
                id="inputPassword"
                required
                :invalid="!!errors?.oldPassword"
                :feedback-invalid="errors?.oldPassword"
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
              <Field
                as="CFormInput"
                name="newPassword"
                type="password"
                id="inputConfirmPassword"
                required
                :invalid="!!errors?.newPassword"
                :feedback-invalid="errors?.newPassword"
              />
            </div>
          </CRow>
          <CRow class="my-4 justify-content-center">
            <div class="col-sm-7 text-center">
              <CButton
                type="submit"
                color="primary"
                class="min-update-width"
              >
                Update
              </CButton>
            </div>
          </CRow>
        </Form>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import { getUserName } from '@/utils/cookies'
import { ref } from '@vue/reactivity'
import { useToast } from 'vue-toastification'
import { changePassword } from '@/services/acount'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'

export default {
  name: 'Schedule',
  components: {
    Form,
    Field,
  },
  setup() {
    const schema = ref({})
    const username = ref('')
    const oldPassword = ref('')
    const newPassword = ref('')
    const dob = ref('')
    const toast = useToast()

    return {
      schema,
      username,
      oldPassword,
      newPassword,
      dob,
      toast,
    }
  },
  methods: {
    setSchema() {
      // TODO: add custom condition for bill here
      this.schema = yup.object({
        oldPassword: yup.string().required('Password is required').min(6, 'Password minimum 6 characters')  ,
        newPassword: yup.string().required('Password is required')
        .min(6, 'Password minimum 6 characters'),
      })
    },
    async handleUpdate(value) {
      console.log(value)
      try {
        const response = await changePassword(value)
        this.toast.success('Success')
        this.oldPassword = ""
        this.newPassword = ""
        this.$refs.myForm.resetForm()
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
    this.setSchema()
  }
}
</script>

<style scoped>
button.min-update-width {
  min-width: 100px;
}
</style>
