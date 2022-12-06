<template>
  <CCard>
    <CCardBody>
      <!-- Page Title -->
      <CCardTitle component="h1" class="mb-4 text-center">Schedule</CCardTitle>
      <CRow class="d-flex mb-4">
        <CCol xs="7" class="d-grid gap-2 d-md-flex justify-content-md-start">
          <CButton @click="newSchedule()" color="success">New Schedule</CButton>
        </CCol>
        <CCol xs="5" class="d-grid gap-2 d-md-flex justify-content-md-end">
          <CDropdown color="primary">
            <CDropdownToggle color="primary">Type of Schedule </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem href="#">Type 1</CDropdownItem>
              <CDropdownItem href="#">Type 2</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CCol>
      </CRow>
      <DataTable
        :columns="columns"
        :datas="datas"
        :pages="pages"
        :queries="queries"
        buttonDone="Export"
        hideFilters
        hideItemPerPageSelector
        hideIndex
        hideActions
        @clickButton="clickExport"
      >
      </DataTable>
    </CCardBody>
  </CCard>
</template>

<script>
import { ref } from '@vue/reactivity'
import DataTable from '@/components/Common/DataTable.vue'
import { CButton } from '@coreui/vue'

export default {
  name: 'ScheduleInfo',
  components: {
    DataTable,
    CButton,
  },
  setup() {
    const value = ref({})
    const datas = ref([])
    const columns = ref([])
    const queries = ref({})

    return {
      value,
      datas,
      columns,
      queries,
    }
  },
  methods: {
    setColumns() {
      this.columns = [
        { data: 'time', title: 'Time' },
        { data: 'mon', title: 'Mon' },
        { data: 'tue', title: 'Tue' },
        { data: 'wed', title: 'Wed' },
        { data: 'thu', title: 'Thu' },
        { data: 'fri', title: 'Fri' },
        { data: 'sat', title: 'Sat' },
        { data: 'sun', title: 'Sun' },
      ]
    },
    setDatas() {
      this.pages = 10
      this.datas = [
        {
          time: '6h45-7h45',
          mon: 'Math(M1234)',
          tue: '',
          wed: '',
          thu: '',
          fri: '',
          sat: '',
          sun: '',
        },
        {
          time: '8h45-9h45',
          mon: 'Math(M1234)',
          tue: '',
          wed: '',
          thu: '',
          fri: '',
          sat: '',
          sun: '',
        },
        {
          time: '10h45-11h45',
          mon: '',
          tue: '',
          wed: 'Math(M1234)',
          thu: '',
          fri: '',
          sat: '',
          sun: '',
        },
        {
          time: '12h45-13h45',
          mon: '',
          tue: '',
          wed: '',
          thu: 'Math(M1234)',
          fri: '',
          sat: '',
          sun: '',
        },
        {
          time: '15h45-16h45',
          mon: '',
          tue: '',
          wed: '',
          thu: '',
          fri: 'Math(M1234)',
          sat: '',
          sun: '',
        },
        {
          time: '16h45-17h45',
          mon: '',
          tue: '',
          wed: '',
          thu: '',
          fri: 'Math(M1234)',
          sat: '',
          sun: '',
        },
        {
          time: '17h45-18h45',
          mon: '',
          tue: 'Math(M1234)',
          wed: '',
          thu: '',
          fri: '',
          sat: '',
          sun: '',
        },
      ]
    },
    setQueries() {
      this.queries = this.$route.query
    },
    clickExport() {
      console.log('export')
    },
    newSchedule() {
      this.$router.push({ name: 'SubjectInfo' })
    },
  },

  created() {
    this.setColumns()
    this.setDatas()
    this.setQueries()
    this.$watch(
      () => this.$route.query,
      async () => {
        if (this.$route.name === 'ScheduleInfo') {
          this.setQueries()
          await this.setDatas()
        }
      },
    )
  },
}
</script>
