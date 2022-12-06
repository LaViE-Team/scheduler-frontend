<template>
  <div>
    <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 2 }">
      <CCol xs class="mt-4 d-flex justify-content-md-center">
        <CCard class="w-75">
          <CCardBody class="text-center">
            <CCardTitle>Schedule</CCardTitle>
            <font-awesome-icon icon="fa-solid fa-file-excel" size="9x" />
          </CCardBody>
          <CCardFooter
            ><CRow class="d-flex">
              <CCol
                xs="6"
                class="d-grid gap-2 d-md-flex justify-content-md-start"
              >
                <p>Export date: 25/06/2022</p>
              </CCol>
              <CCol
                xs="6"
                class="d-grid gap-2 d-md-flex justify-content-md-end"
              >
                <CButton color="info" href="#">Download</CButton>
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol xs class="mt-4 d-flex justify-content-md-center">
        <CCard class="w-75">
          <CCardBody class="text-center">
            <CCardTitle>Schedule</CCardTitle>
            <font-awesome-icon icon="fa-solid fa-file-excel" size="9x" />
          </CCardBody>
          <CCardFooter
            ><CRow class="d-flex">
              <CCol
                xs="6"
                class="d-grid gap-2 d-md-flex justify-content-md-start"
              >
                <p>Export date: 25/06/2022</p>
              </CCol>
              <CCol
                xs="6"
                class="d-grid gap-2 d-md-flex justify-content-md-end"
              >
                <CButton color="info" href="#">Download</CButton>
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol xs class="mt-4 d-flex justify-content-md-center">
        <CCard class="w-75">
          <CCardBody class="text-center">
            <CCardTitle>Schedule</CCardTitle>
            <font-awesome-icon icon="fa-solid fa-file-excel" size="9x" />
          </CCardBody>
          <CCardFooter
            ><CRow class="d-flex">
              <CCol
                xs="6"
                class="d-grid gap-2 d-md-flex justify-content-md-start"
              >
                <p>Export date: 25/06/2022</p>
              </CCol>
              <CCol
                xs="6"
                class="d-grid gap-2 d-md-flex justify-content-md-end"
              >
                <CButton color="info" href="#">Download</CButton>
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol xs class="mt-4 d-flex justify-content-md-center">
        <CCard class="w-75">
          <CCardBody class="text-center">
            <CCardTitle>Schedule</CCardTitle>
            <font-awesome-icon icon="fa-solid fa-file-excel" size="9x" />
          </CCardBody>
          <CCardFooter
            ><CRow class="d-flex">
              <CCol
                xs="6"
                class="d-grid gap-2 d-md-flex justify-content-md-start"
              >
                <p>Export date: 25/06/2022</p>
              </CCol>
              <CCol
                xs="6"
                class="d-grid gap-2 d-md-flex justify-content-md-end"
              >
                <CButton color="info" href="#">Download</CButton>
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
    <div class="mt-4 mb-2 d-flex justify-content-center align-items-center">
      <Pagination
        :pages="pages"
        @pageChange="handlePageChange"
        :currentPage="currentPage"
      />
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Common/Pagination.vue'
import { ref } from '@vue/reactivity'

export default {
  name: 'Home',
  components: {
    Pagination,
  },
  setup() {
    const pages = ref()
    const currentPage = ref()
    const queries = ref({})
    return {
      pages,
      currentPage,
      queries,
    }
  },
  watch: {
    queries(queries) {
      this.setQueriesData(queries)
    },
  },
  methods: {
    handlePageChange(number) {
      this.$router.push({ query: { page: number } })
    },
    setDatas() {
      this.pages = 4
    },
    setQueries() {
      this.queries = this.$route.query
    },
    setQueriesData(queries) {
      this.currentPage = parseInt(queries?.['page']) || 1
    },
  },
  created() {
    this.setQueries()
    this.setDatas()
    this.$watch(
      () => this.$route.query,
      async () => {
        if (this.$route.name === 'Homepage') {
          this.setQueries()
          await this.setDatas()
        }
      },
    )
  },
}
</script>
