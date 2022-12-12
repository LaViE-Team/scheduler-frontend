<template>
  <CModal @click="emitClose">
    <CForm>
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
              id="classCode"
              :value="data.classCode"
              required
            />
          </CCol>
        </CRow>
        <DataTable
          :columns="columns"
          :datas="data.time"
          hideFilters
          hideItemPerPageSelector
          hidePagination
          hideIndex
          hideHeader
          @deleteClick="handleDeleteTime"
          :hasDelete="true"
          @addClick="handleAddTime"
          :hasAdd="true"
        >
          <template #column(time)="">
            <p class="m-0 fw-semibold">Time</p>
          </template>
          <template #column(day)="{ value }">
            <CFormSelect class="class-day" required>
              <option
                v-for="option in dayOption"
                :key="option.value"
                :value="option.value"
                :selected="option.label === value"
              >
                {{ option.label }}
              </option>
            </CFormSelect>
          </template>
          <template #column(startTime)="{ value }">
            <CFormInput type="time" :value="value" required />
          </template>
          <template #column(~)="">
            <span>~</span>
          </template>
          <template #column(endTime)="{ value }">
            <CFormInput type="time" :value="value" required />
          </template>
        </DataTable>
      </CModalBody>
      <CModalFooter class="d-flex justify-content-between">
        <CButton color="secondary" variant="outline" @click="emitClose"
          >Cancel</CButton
        >
        <CButton type="submit" color="primary" @click.prevent="handleDone"
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
import DataTable from '@/components/Common/DataTable.vue'

export default {
  name: 'EditClassModal',
  components: {
    DataTable,
  },
  setup() {
    // const store = useStore()
    const data = ref([])
    const columns = ref([])
    const dayOption = [
      { label: 'Mon', value: '1' },
      { label: 'Tue', value: '2' },
      { label: 'Wed', value: '3' },
      { label: 'Thu', value: '4' },
      { label: 'Fri', value: '5' },
      { label: 'Sat', value: '6' },
      { label: 'Sun', value: '7' },
    ]

    return {
      columns,
      data,
      dayOption,
    }
  },
  methods: {
    setColumns() {
      this.columns = [
        { data: 'time', title: '' },
        { data: 'day', title: 'Day' },
        { data: 'startTime', title: 'Start Time' },
        { data: '~', title: '' },
        { data: 'endTime', title: 'End Time' },
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
    },
    emitClose() {
      this.$emit('close')
    },
    handleDeleteTime(time) {
      this.data.time = this.data.time.filter((t) => t !== time)
    },
    handleAddTime() {
      this.data.time.push({ day: '', startTime: '', endTime: '' })
    },
    handleDone() {
      this.emitClose()
      console.log('done')
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
