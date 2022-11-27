<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol xs="12" md="10" lg="8" xl="6">
          <CCard class="p-4">
            <CCardBody>
              <h1 class="text-center">LOGIN</h1>
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
                    <span v-else>SIGN IN</span>
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
                    @click="() => $router.push({ name: 'Register' })"
                  >
                    <span>REGISTER</span>
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
import { login } from '@/services/auth'
import { setAccessToken } from '@/utils/cookies'

export default {
  name: 'Login',
  components: {
    Form,
    Field,
    BtnFacebook,
    BtnGmail,
  },
  setup() {
    const schema = ref({})
    const isSubmiting = ref(false)

    return {
      isSubmiting,
      schema,
    }
  },
  methods: {
    setSchema() {
      // TODO: add custom condition for bill here
      this.schema = yup.object({
        username: yup.string().required('User name is required'),
        password: yup.string().required('password is required'),
        // .min(8, 'password is required'),
      })
    },
    async onSubmit(values) {
      this.isSubmiting = true

      const body = {
        username: values.username,
        password: values.password,
      }

      try {
        // const response = await login(body)
        // await new Promise((resolve) =>
        //   setTimeout(() => {
        //     console.log(body)
        //     resolve()
        //   }, 500),
        // )
        const response = await login(body)

        if (response?.data) {
          setAccessToken(response.data.access_token, {
            expires: new Date(Date.now() + response.data.expires_in * 1000),
          })

          this.$router.replace({ name: 'Home' })
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
