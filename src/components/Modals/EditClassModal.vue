<template>
  <CModal :visible="isVisible" @click="emitClose">
    <CForm>
      <CModalBody>
        <CRow class="mb-4">
          <CCol sm="3" class="py-1 fw-semibold"> Class ID </CCol>
          <CCol sm="3" class="py-1 border rounded">
            {{ data.class_code }}
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
          hasDelete="true"
          @addClick="handleAddTime"
          hasAdd="true"
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
        <CButton type="submit" color="primary" @click="handleDone"
          >Done</CButton
        >
      </CModalFooter>
    </CForm>
  </CModal>
</template>

<script>
import { ref } from '@vue/reactivity'
import DataTable from '@/components/Common/DataTable.vue'

export default {
  name: 'EditClassModal',
  props: [],
  components: {
    DataTable,
  },
  setup() {
    const data = ref([])
    const columns = ref([])
    const isVisible = ref(false)
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
      isVisible,
    }
  },
  methods: {
    // modal edit class
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
      this.data = {
        class_code: 'IT123',
        time: [
          { day: 'Wed', startTime: '06:45', endTime: '09:00' },
          { day: 'Tue', startTime: '06:45', endTime: '09:00' },
        ],
      }
    },
    emitClose() {
      this.$emit('close')
    },
    handleDeleteTime(time) {
      this.data.time = this.data.time.filter((t) => t !== time)
    },
    handleAddTime() {
      this.data.time.push({
        day: '',
        startTime: '',
        endTime: '',
      })
    },
    handleDone() {
      console.log('done')
    },
  },
  created() {
    this.setColumns()
    this.setDatas()
  },
}
</script>

<style scoped>
.class-day {
  min-width: 82px;
}
</style>
