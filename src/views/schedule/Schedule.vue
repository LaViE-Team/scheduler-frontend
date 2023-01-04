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
                    ref="selected"
                    v-model="subject"
                    :options="getSubject"
                    searchable
                    mode="single"
                    :filter-results="false"
                    :minChars="0"
                    :delay="500"
                    noOptionsText=""
                    noResultsText="" /><CButton
                  ><font-awesome-icon
                    @click="handleAdd"
                    icon="fa-solid fa-plus" /></CButton
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
import { Form } from 'vee-validate'
import DataTable from '@/components/Common/DataTable.vue'
import EditSubjectModal from '@/components/Modals/EditSubjectModal.vue'
import EditClassModal from '@/components/Modals/EditClassModal.vue'
import { uploadCsv, exportSchedule, getDatas, downloadSample, updateData } from '@/services/schedule'
import { useToast } from 'vue-toastification'

export default {
  name: 'Schedule',
  components: {
    Form,
    DataTable,
    EditSubjectModal,
    EditClassModal,
  },
  setup() {
    const key = ref()
    const toast = useToast()
    const store = useStore()
    const value = ref({})
    const datas = ref([])
    const columns = ref([])
    const queries = ref({})
    const isLoading = ref(false)
    const file = ref()
    const subject = ref()
    const pages = ref(1)
    // const data = ref([])

    return {
      key,
      pages,
      toast,
      isLoading,
      subject,
      file,
      value,
      datas,
      columns,
      queries,
      allSubjects: computed(() => store.getters.allSubjects),
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
    async setDatas() {
      // this.pages = 1
      try {
        const response = await getDatas()

        this.$store.dispatch('setAllSubjects', response)
        // console.log(this.reformatedSubject)
        // console.log(this.allSubjects)
        this.datas = this.reformatedSubject
        this.$refs.selected.refreshOptions();
      } finally {
        this.isLoading = false
        //this.$router.push({ name: 'SubjectInfo' })
      }
      // this.datas = this.reformatedSubject
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
        // console.log(response)
        await this.$store.dispatch('setAllSubjects', response)
        this.toast.success('Upload Success')
        this.$refs.selected.refreshOptions();
        // console.log(this.$store.getters.allSubjects)
        this.datas = this.reformatedSubject
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
    searchSubject(key = '') {
      const filter = key != null ? key.toUpperCase() : ''
      this.key = key != null ? key : ''
      var data = []
      this.allSubjects.forEach((obj) => {
        var subName = obj.subjectName.toUpperCase()
        if (subName.search(filter) >= 0 && !this.subjects.map(e => {return e.subjectCode} ).includes(obj.subjectCode))
          data.push({ value: obj.subjectCode, label: obj.subjectName })
      })
      return data
    },
    handleAdd() {
      // console.log(this.subject)
      if (this.subject) {
        const result = this.allSubjects.filter((obj) => {
          return obj.subjectCode == this.subject
        })
        this.$store.dispatch('addSubject', result[0])
        this.datas = this.reformatedSubject
        this.$refs.selected.clear();
        this.$refs.selected.refreshOptions();
      } else {
        this.$store.dispatch('setSubjectName', this.key)
        this.$store.dispatch('setEditedSubjectID', '')
        this.$store.dispatch('setEditedSubject', null)
        
        this.toggleEditSubject()
        // console.log(this.key)
      }
    },
    async downloadsample() {
      try {
        const response = await downloadSample()
        var fileURL = window.URL.createObjectURL(new Blob([response]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'sample.csv');
        document.body.appendChild(fileLink);
        fileLink.click();
      } catch (error) {
        console.log(error)
      }
    },
    handleView() {
      console.log('view')
    },
    handleEdit(subject) {
      this.$store.dispatch('setEditedSubjectID', subject.subjectCode)
      this.$store.dispatch('setEditedSubject', subject.subjectCode)
      this.toggleEditSubject()
    },
    handleDelete(subject) {
      this.$store.dispatch('deleteSubject', subject.subjectCode)
      this.datas = this.reformatedSubject
      this.$refs.selected.refreshOptions();
      // console.log(this.$store.getters.allSubjects)
      // console.log(this.subjects)
      // console.log(subject)
    },
    async clickDone() {
      const subjectCodes = this.datas.map((e) => {
        return e.subjectCode
      })
      try {
        const response = await exportSchedule(subjectCodes)

        this.$store.dispatch('setSchedules', response)
        // await updateData([])
        // console.log(this.$store.getters.schedules)
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
  },

  async created() {
    await this.setDatas()
    this.setColumns()
    this.setQueries()
    
    this.$watch(
      () => {
        this.key
      },
      () => {
        this.subjects
      },
      () => {
        this.reformatedSubject
      },
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
