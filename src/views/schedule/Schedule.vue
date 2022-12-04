<template>
  <CCard>
    <CCardBody>
      <!-- Page Title -->
      <CCardTitle component="h1" class="mb-4 text-center"
        >Subject Information</CCardTitle
      >
      <CRow class="d-flex mb-3">
        <CCol xs="7" class="d-grid gap-2 d-md-flex justify-content-md-start">
          <CDropdown color="primary">
            <CDropdownToggle color="primary">Import </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem href="#"
                >Import File CSV <CIcon icon="cilCloudUpload"
              /></CDropdownItem>
              <CDropdownItem href="#"
                >Download Sample CSV <CIcon icon="cilCloudDownload"
              /></CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CCol>
        <CCol xs="5">
          <CRow>
            <CCol xs="4" class="d-grid gap-2 d-md-flex justify-content-md-end"
              ><Multiselect
                v-model="value"
                placeholder="Subject"
                :filter-results="false"
                :min-chars="0"
                :resolve-on-load="false"
                :delay="0"
                :searchable="true"
                :options="
                  async function (query) {
                    return await fetchLanguages(query) // check JS block for implementation
                  }
                " /><CButton
                ><font-awesome-icon icon="fa-solid fa-plus" /></CButton
            ></CCol>
          </CRow>
        </CCol>
      </CRow>
      <DataTable
        :columns="columns"
        :datas="datas"
        hideFilters
        hideItemPerPageSelector
        hidePagination
        hideIndex
        clickable
        @viewClick="handleView"
        @editClick="handleEdit"
        hasEdit="true"
        @deleteClick="handleDelete"
        hasDelete="true"
      >
        <template #column(class_code)="{ value }">
          <p class="m-0" v-for="data in value" :key="data.name">
            {{ data.name }}
          </p>
        </template>
        <template #column(time)="{ value }">
          <p class="m-0" v-for="data in value" :key="data.time">
            {{ data.time }}
          </p>
        </template>
      </DataTable>
    </CCardBody>
  </CCard>
</template>

<script>
import { ref } from '@vue/reactivity'
import DataTable from '@/components/Common/DataTable.vue'

export default {
  name: 'Schedule',
  components: {
    DataTable,
  },
  setup() {
    const value = ref({})
    const datas = ref([])
    const columns = ref([])

    return {
      value,
      datas,
      columns,
    }
  },
  methods: {
    setColumns() {
      this.columns = [
        { data: 'subject', title: 'Subject' },
        { data: 'class_code', title: 'Classcode' },
        { data: 'time', title: 'Time' },
      ]
    },
    setDatas() {
      this.datas = [
        {
          subject: 'C BAsic',
          class_code: [{ name: 'IT123' }, { name: 'IT122' }],
          time: [{ time: 'Wed 6h-9h' }, { time: 'Wed 6h-9h' }],
        },
        {
          subject: 'C BAsic',
          class_code: [{ name: 'IT123' }, { name: 'IT122' }],
          time: [{ time: 'Wed 6h-9h' }, { time: 'Wed 6h-9h' }],
        },
        {
          subject: 'C BAsic',
          class_code: [{ name: 'IT123' }, { name: 'IT122' }],
          time: [{ time: 'Wed 6h-9h' }, { time: 'Wed 6h-9h' }],
        },
      ]
    },
    handleView() {
      console.log('view')
    },
    handleEdit() {
      console.log('edit')
    },
    handleDelete() {
      console.log('delete')
    },
    async fetchLanguages(query) {
      // From: https://www.back4app.com/database/paul-datasets/list-of-all-programming-languages/get-started/javascript/rest-api/fetch?objectClassSlug=dataset

      let where = ''

      if (query) {
        where =
          '&where=' +
          encodeURIComponent(
            JSON.stringify({
              ProgrammingLanguage: {
                $regex: `${query}|${query.toUpperCase()}|${
                  query[0].toUpperCase() + query.slice(1)
                }`,
              },
            }),
          )
      }

      const response = await fetch(
        'https://parseapi.back4app.com/classes/All_Programming_Languages?limit=9999&order=ProgrammingLanguage&keys=ProgrammingLanguage' +
          where,
        {
          headers: {
            'X-Parse-Application-Id':
              'XpRShKqJcxlqE5EQKs4bmSkozac44osKifZvLXCL', // This is the fake app's application id
            'X-Parse-Master-Key': 'Mr2UIBiCImScFbbCLndBv8qPRUKwBAq27plwXVuv', // This is the fake app's readonly master key
          },
        },
      )

      const data = await response.json() // Here you have the data that you need

      return data.results.map((item) => {
        return {
          value: item.ProgrammingLanguage,
          label: item.ProgrammingLanguage,
        }
      })
    },
  },
  created() {
    this.setColumns()
    this.setDatas()
  },
}
</script>
