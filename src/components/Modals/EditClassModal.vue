<template>
  <CModal @click="emitClose">
    <CForm id="editClassForm" @submit.prevent="handleDone">
      <CModalBody>
        <CRow class="mb-4">
          <CCol sm="3">
            <CFormLabel for="classCode" class="col-form-label fw-semibold">
              Class Code
            </CFormLabel>
          </CCol>
          <CCol sm="3">
            <CFormInput
              type="text"
              v-model="classCode"
              id="classCode"
              name="classCode"
              :value="data.classCode"
              required
            />
          </CCol>
        </CRow>
        <CTable bordered>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell
                v-for="column in columns"
                :key="column.data"
                class="text-nowrap position-sticky"
              >
                {{ column.title }}
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow
              v-for="(data, index) in time"
              :key="data.id"
              class="align-top"
            >
              <CTableDataCell
                ><CFormSelect
                  class="class-day"
                  v-model="time[index].day"
                  :key="index"
                  required
                >
                  <option v-if="!time[index].day" selected disabled>Select day</option>
                  <option v-for="option in dayOption" :key="option">
                    {{ option }}
                  </option>
                </CFormSelect></CTableDataCell
              >
              <CTableDataCell
                ><CFormInput
                  type="time"
                  v-model="time[index].startTime"
                  :key="index"
                  :value="data.startTime"
                  required
              /></CTableDataCell>
              <CTableDataCell><span>~</span></CTableDataCell
              ><CTableDataCell
                ><CFormInput
                  type="time"
                  v-model="time[index].endTime"
                  :key="index"
                  :value="data.endTime"
                  required
                />
              </CTableDataCell>
              <CTableDataCell>
                <div class="d-flex align-items-center">
                  <CButton
                    color="danger"
                    shape="rounded-pill"
                    class="ms-2 text-light"
                    @click="handleDeleteTime(data)"
                  >
                    <font-awesome-icon icon="fa-solid fa-trash" />
                  </CButton></div></CTableDataCell
            ></CTableRow>
            <CTableRow>
              <CTableDataCell class="text-center" :colspan="columns.length + 1">
                <CButton
                  @click="handleAddTime"
                  type="button"
                  color="success"
                  shape="rounded-pill"
                  class="ms-2 text-light"
                >
                  <font-awesome-icon icon="fa-solid fa-plus" />
                </CButton>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CModalBody>
      <CModalFooter class="d-flex justify-content-between">
        <CButton color="secondary" variant="outline" @click="emitClose"
          >Cancel</CButton
        >
        <CButton type="submit" form="editClassForm" color="primary"
          >Done</CButton
        >
      </CModalFooter>
    </CForm>
  </CModal>
</template>

<script>
import { ref } from '@vue/reactivity'
// import { computed } from 'vue'
// import { useStore } from 'vuex'
// import DataTable from '@/components/Common/DataTable.vue'
import { CTableHeaderCell } from '@coreui/vue'

export default {
  name: 'EditClassModal',
  components: {
    // DataTable,
    CTableHeaderCell,
  },
  setup() {
    // const store = useStore()
    const data = ref([])
    const columns = ref([])
    const dayOption = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const submit = ref([])
    const time = ref([])
    const classCode = ref()

    return {
      columns,
      data,
      dayOption,
      submit,
      time,
      classCode,
    }
  },
  methods: {
    setColumns() {
      this.columns = [
        { data: 'day', title: 'Day' },
        { data: 'startTime', title: 'Start Time' },
        { data: '~', title: '' },
        { data: 'endTime', title: 'End Time' },
        { data: 'action', title: '' },
      ]
    },
    setDatas() {
      let editedClassCode = this.$store.getters.editedClassCode
      if (editedClassCode) {
        this.data = this.$store.getters.getEditedClass
      } else {
        this.data = {
          classCode: '',
          time: [{ day: '', startTime: '', endTime: '' }],
        }
      }
      this.time = JSON.parse(JSON.stringify(this.data.time))
      // this.time = this.data.time
    },
    emitClose() {
      this.$emit('close')
    },
    handleDeleteTime(time) {
      this.data.time = this.data.time.findIndex((t) => t == time)
      this.time = this.time.filter((t) => t !== time)
    },
    handleAddTime() {
      this.time.push({
        day: '',
        startTime: '',
        endTime: '',
      })
    },
    async handleDone() {
      const value = {
        subjectCode: this.$store.getters.getEditedSubject.subjectCode,
        classCode: this.data.classCode,
        new: {
          classCode: this.classCode ? this.classCode : this.data.classCode,
          time: this.time,
        },
      }
      await this.$store.dispatch('editClass', value)
      this.emitClose()
    },
  },
  async created() {
    this.setColumns()
    this.setDatas()
  },
  watch: {
    '$store.getters.editedClassCode': {
      handler: function () {
        this.setDatas()
      },
    },
  },
}
</script>

<style scoped></style>
