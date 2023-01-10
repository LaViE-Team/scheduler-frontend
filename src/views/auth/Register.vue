<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol xs="12" md="10" lg="8" xl="6">
          <CCard class="p-4">
            <CCardBody>
              <h1 class="text-center">REGISTER</h1>
              <Form
                as="CForm"
                v-slot="{ errors }"
                @submit="onSubmit"
                :validation-schema="schema"
              >
                <CFormFloating class="my-4">
                  <Field
                    as="CFormInput"
                    name="username"
                    type="text"
                    id="username"
                    placeholder="username"
                    :invalid="!!errors?.username"
                    :feedback-invalid="errors?.username"
                  />
                  <CFormLabel for="username">Username </CFormLabel>
                </CFormFloating>

                <CFormFloating class="my-4">
                  <Field
                    as="CFormInput"
                    name="password"
                    type="password"
                    id="password"
                    placeholder="password"
                    :invalid="!!errors?.password"
                    :feedback-invalid="errors?.password"
                  />
                  <CFormLabel for="password"> Password </CFormLabel>
                </CFormFloating>

                <CFormFloating class="my-4">
                  <Field
                    as="CFormInput"
                    name="confirm_password"
                    type="password"
                    id="confirm_password"
                    placeholder="Confirm password"
                    :invalid="!!errors?.confirm_password"
                    :feedback-invalid="errors?.confirm_password"
                  />
                  <CFormLabel for="confirm_password">
                    Confirm password
                  </CFormLabel>
                </CFormFloating>

                <div class="d-grid gap-2 col-4 mx-auto my-2">
                  <CButton
                    class="px-4"
                    type="submit"
                    color="light"
                    size="lg"
                    :disabled="isSubmiting || Object.keys(errors).length > 0"
                  >
                    <CSpinner
                      v-if="isSubmiting"
                      component="span"
                      size="sm"
                      aria-hidden="true"
                    />
                    <span v-else>REGISTER</span>
                  </CButton>
                </div>
                <div class="d-grid gap-2 col-8 mx-auto my-2">
                  <BtnFacebook />
                </div>
                <div class="d-grid gap-2 col-8 mx-auto my-2">
                  <BtnGmail />
                </div>
                <div class="d-grid gap-2 col-4 mx-auto my-2">
                  <CButton
                    class="px-4"
                    color="light"
                    size="lg"
                    @click="() => $router.push({ name: 'Login' })"
                  >
                    <span>SIGN IN</span>
                  </CButton>
                </div>
              </Form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import BtnFacebook from '@/components/Auth/BtnFacebook.vue'
import BtnGmail from '@/components/Auth/BtnGmail.vue'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import { ref } from '@vue/reactivity'
import { register } from '@/services/auth'
import { useToast } from 'vue-toastification'

export default {
  name: 'Register',
  components: {
    Form,
    Field,
    BtnFacebook,
    BtnGmail,
  },
  setup() {
    const schema = ref({})
    const isSubmiting = ref(false)
    const toast = useToast()

    return {
      isSubmiting,
      schema,
      toast,
    }
  },
  methods: {
    setSchema() {
      // TODO: add custom condition for bill here
      this.schema = yup.object({
        username: yup.string().required('User name is required'),
        password: yup
          .string()
          .required('password is required')
          .min(6, 'Password minimum 6 characters'),
        confirm_password: yup
          .string()
          .required('confirm password is required')
          .oneOf([yup.ref('password'), null], "Passwords don't match!")
          .min(6, 'Password minimum 6 characters'),
      })
    },
    async onSubmit(values) {
      this.isSubmiting = true

      const body = {
        username: values.username,
        password: values.password,
        email: values.username,
        service_pack: 0,
      }

      try {
        // await new Promise((resolve) =>
        //   setTimeout(() => {
        //     console.log(body)
        //     resolve()
        //   }, 500),
        // )
        const response = await register(body)
        if (response.success) {
          this.toast.success('Create account success')
          this.$router.replace({ name: 'Login' })
        }
      } finally {
        this.isSubmiting = false
      }
    },
  },
  created() {
    this.setSchema()
  },
}
</script>
