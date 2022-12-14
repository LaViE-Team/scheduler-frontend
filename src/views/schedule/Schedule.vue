<template>
  <div>
    <CCard>
      <CCardBody>
        <!-- Page Title -->
        <CCardTitle component="h1" class="mb-4 text-center"
          >Subject Information</CCardTitle
        >
        <CRow class="d-flex">
          <CCol xs="7" class="d-grid gap-2 d-md-flex justify-content-md-start">
            <CDropdown color="primary">
              <CDropdownToggle color="primary">Import </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem role="button" @click="chooseFiles()"
                  >Import File CSV
                  <input
                    id="fileUpload"
                    ref="file"
                    @change="uploadFile"
                    type="file"
                    hidden /><CIcon icon="cilCloudUpload"
                /></CDropdownItem>
                <CDropdownItem role="button" @click="downloadsample()"
                  >Download Sample CSV <CIcon icon="cilCloudDownload"
                /></CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CCol>
          <CCol xs="5">
            <CRow>
              <CCol xs="8" class="d-grid gap-2 d-md-flex justify-content-md-end"
                ><Multiselect
                  v-model="subject"
                  :options="getSubject"
                  searchable
                  mode="single"
                  :filter-results="false"
                  :minChars="0"
                  :delay="500"
                  noOptionsText=""
                  noResultsText="" /><CButton
                  ><font-awesome-icon icon="fa-solid fa-plus" /></CButton
              ></CCol>
            </CRow>
          </CCol>
        </CRow>
        <DataTable
          :columns="columns"
          :datas="datas"
          :pages="pages"
          :queries="queries"
          hideFilters
          hideItemPerPageSelector
          hideIndex
          clickable
          @viewClick="handleView"
          :hasView="true"
          @editClick="handleEdit"
          :hasEdit="true"
          @deleteClick="handleDelete"
          :hasDelete="true"
          @clickButton="clickDone"
        >
          <template #column(classCode)="{ value }">
            <p class="m-0" v-for="data in value" :key="data">
              <span v-if="data[0] != ' '">{{ data }}</span>
              <br v-else />
            </p>
          </template>
          <template #column(time)="{ value }">
            <p class="m-0" v-for="data in value" :key="data.time">
              {{ data.day }} {{ data.startTime }}-{{ data.endTime }}
            </p>
          </template>
        </DataTable>
      </CCardBody>
    </CCard>

    <div>
      <EditSubjectModal
        :visible="showEditSubjectModal"
        @close="toggleEditSubject"
        @editClass="toggleEditClass"
        @resetHandleGetData="setDatas"
      />

      <EditClassModal :visible="showEditClassModal" @close="toggleEditClass" />
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { computed } from 'vue'
import { useStore } from 'vuex'
import DataTable from '@/components/Common/DataTable.vue'
import EditSubjectModal from '@/components/Modals/EditSubjectModal.vue'
import EditClassModal from '@/components/Modals/EditClassModal.vue'
import { uploadCsv, exportSchedule } from '@/services/schedule'

export default {
  name: 'Schedule',
  components: {
    DataTable,
    EditSubjectModal,
    EditClassModal,
  },
  setup() {
    const store = useStore()
    const value = ref({})
    const datas = ref([])
    const columns = ref([])
    const queries = ref({})
    const isLoading = ref(false)
    const file = ref()
    const subject = ref()
    // const data = ref([])

    return {
      isLoading,
      subject,
      file,
      value,
      datas,
      columns,
      queries,
      subjects: computed(() => store.getters.subjects),
      reformatedSubject: computed(() => store.getters.reformatedSubject),
      showEditSubjectModal: computed(() => store.getters.showEditSubjectModal),
      showEditClassModal: computed(() => store.getters.showEditClassModal),
      editedSubjectID: computed(() => store.getters.editedSubjectID),
    }
  },
  methods: {
    setColumns() {
      this.columns = [
        { data: 'subjectName', title: 'Subject' },
        { data: 'classCode', title: 'Class Code' },
        { data: 'time', title: 'Time' },
      ]
    },
    setDatas() {
      this.pages = 1
      this.datas = this.reformatedSubject
      // console.log(this.datas)
    },
    setQueries() {
      this.queries = this.$route.query
    },
    chooseFiles: function () {
      document.getElementById('fileUpload').click()
    },
    async uploadFile() {
      this.isLoading = true
      this.file = this.$refs.file.files[0]
      let formData = new FormData()
      formData.append('file', this.file)
      try {
        const response = await uploadCsv(formData)

        this.$store.dispatch('setSubjects', response)
        // console.log(this.reformatedSubject)
        this.setDatas()
      } finally {
        this.isLoading = false
        //this.$router.push({ name: 'SubjectInfo' })
      }
    },
    async getSubject(keyword = '') {
      try {
        const response = await this.searchSubject(keyword)
        // console.log(response)
        return response
      } catch (error) {
        console.error(error)
        return []
      }
    },
    downloadsample() {
      window.open('https://api.lavieteam.works/csv/download-sample')
    },
    searchSubject(key) {
      const filter = key != null ? key.toUpperCase : ''
      const data = this.subjects.filter((obj) => {
        var subName = obj.subjectName.toUpperCase()
        if (subName.search(filter) >= 0) return obj
      })
      return data
    },
    handleView() {
      console.log('view')
    },
    handleEdit(subject) {
      this.$store.dispatch('setEditedSubjectID', subject.subjectCode)
      this.$store.dispatch('setEditedSubject', subject.subjectCode)
      this.toggleEditSubject()
    },
    handleDelete() {
      console.log('delete')
    },
    async clickDone() {
      const subjectCodes = this.datas.map((e) => {
        return e.subjectCode
      })
      try {
        const response = await exportSchedule(subjectCodes)

        this.$store.dispatch('setSchedules', response)
        console.log(this.$store.getters.schedules)
        // console.log(this.reformatedSubject)
      } finally {
        // this.isLoading = false
        this.$router.push({ name: 'ScheduleInfo' })
      }

      // this.$router.push({ name: 'ScheduleInfo' })
    },
    toggleEditSubject() {
      this.$store.dispatch('toggleEditSubject')
    },
    toggleEditClass() {
      this.$store.dispatch('toggleEditClass')
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

  async created() {
    this.setColumns()
    this.setQueries()
    this.setDatas()
    this.$watch(
      () => this.reformatedSubject,
      () => this.$route.query,
      () => {
        this.showEditSubjectModal, this.toggleEditSubject()
      },
      async () => {
        if (this.$route.name === 'SubjectInfo') {
          this.setQueries()
          await this.setDatas()
        }
      },
    )
  },
}
</script>

<style></style>
