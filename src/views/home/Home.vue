<template>
  <div>
    <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 2 }">
      <CCol
        v-for="timetable in timetables"
        xs
        class="mt-4 d-flex justify-content-md-center"
      >
        <CCard class="w-75">
          <CCardBody class="text-center">
            <CCardTitle>{{ timetable.schedule_file }}</CCardTitle>
            <font-awesome-icon icon="fa-solid fa-file-excel" size="9x" />
          </CCardBody>
          <CCardFooter
            ><CRow class="d-flex">
              <CCol
                xs="6"
                class="d-grid gap-2 d-md-flex justify-content-md-start"
              >
                <p>
                  Export date:
                  {{
                    new Date(timetable.created_at)
                      .toISOString()
                      .replace('-', '/')
                      .split('T')[0]
                      .replace('-', '/')
                  }}
                </p>
              </CCol>
              <CCol
                xs="6"
                class="d-grid gap-2 d-md-flex justify-content-md-end"
              >
                <CButton color="info" @click="donwload(timetable.id)"
                  >Download <font-awesome-icon icon="fa-solid fa-download"
                /></CButton>
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
import { getExportedTimtables, downloadTimetable } from '@/services/timetable'

export default {
  name: 'Home',
  components: {
    Pagination,
  },
  setup() {
    const pages = ref(1)
    const currentPage = ref()
    const queries = ref({})
    const timetables = ref([])
    const allTimetables = ref([])

    return {
      timetables,
      allTimetables,
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
    async setDatas(page) {
      try {
        page = page ? page : 1
        const response = await getExportedTimtables()
        this.allTimetables = response
        this.timetables = this.allTimetables.slice((page - 1) * 4, page * 4)
        console.log(this.timetables)
      } finally {
        // this.isLoading = false
        // this.$router.push({ name: 'ScheduleInfo' })
      }
      this.pages = parseInt(this.allTimetables.length / 4) + 1
    },
    async donwload(id) {
      try {
        const response = await downloadTimetable({ file_id: id })
        var fileURL = window.URL.createObjectURL(new Blob([response]))
        var fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', `schedule${id}.csv`)
        document.body.appendChild(fileLink)
        fileLink.click()
      } finally {
        // this.isLoading = false
        // this.$router.push({ name: 'ScheduleInfo' })
      }
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
          // console.log(this.queries)
          await this.setDatas(this.queries.page)
        }
      },
    )
  },
}
</script>
