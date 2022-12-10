<template>
  <CModal :visible="isVisible" @click="emitClose">
    <CForm>
      <CModalBody>
        <CRow class="mb-4">
          <CCol sm="3">
            <CFormLabel for="subject" class="col-form-label fw-semibold">
              Subject
            </CFormLabel>
          </CCol>
          <CCol sm="6">
            <CFormInput
              type="text"
              id="subject"
              :value="data.subject"
              required
            />
          </CCol>
        </CRow>
        <DataTable
          :columns="columns"
          :datas="data.classes"
          hideFilters
          hideItemPerPageSelector
          hidePagination
          hideIndex
          clickable
          @editClick="handleEditClass"
          hasEdit="true"
          @deleteClick="handleDeleteClass"
          hasDelete="true"
          @addClick="handleAddClass"
          hasAdd="true"
        >
          <template #column(time)="{ value }">
            <p class="m-0" v-for="data in value" :key="data.time">
              {{ data.day }} {{ data.startTime }}-{{ data.endTime }}
            </p>
          </template>
        </DataTable>
      </CModalBody>
      <CModalFooter class="d-flex justify-content-between">
        <CButton color="secondary" variant="outline" @click="emitClose">
          Cancel
        </CButton>
        <CButton type="submit" color="primary" @click.prevent="handleDone">
          Done
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
</template>

<script>
import { ref } from '@vue/reactivity'
import DataTable from '@/components/Common/DataTable.vue'

export default {
  name: 'EditSubjectModal',
  props: [],
  components: {
    DataTable,
  },
  setup() {
    const data = ref([])
    const columns = ref([])
    const isVisible = ref(false)
    const showEditClassModal = ref(false)
    return {
      columns,
      data,
      isVisible,
      showEditClassModal,
    }
  },
  methods: {
    setColumns() {
      this.columns = [
        { data: 'class_code', title: 'Class Code' },
        { data: 'time', title: 'Time' },
      ]
    },
    setData() {
      this.data = {
        subject: 'C Basic',
        classes: [
          {
            class_code: 'IT123',
            time: [
              { day: 'Mon', startTime: '06:45', endTime: '09:00' },
              { day: 'Wed', startTime: '06:45', endTime: '09:00' },
            ],
          },
          {
            class_code: 'IT123',
            time: [
              { day: 'Tue', startTime: '06:45', endTime: '09:00' },
              { day: 'Thu', startTime: '06:45', endTime: '09:00' },
            ],
          },
        ],
      }
    },
    emitClose() {
      this.$emit('close')
    },
    emitEditClass() {
      this.$emit('editClass')
    },
    toggleIsVisible() {
      this.isVisible = !this.isVisible
    },
    toggleShowEditClassModal() {
      this.showEditClassModal = !this.showEditClassModal
    },
    handleEditClass() {
      this.emitEditClass()
      this.emitClose()
    },
    handleDeleteClass(_class) {
      this.data.classes = this.data.classes.filter((c) => c !== _class)
    },
    handleAddClass() {
      this.data.classes.push({
        subject: 'new',
        classes: [
          {
            class_code: '...',
            time: [],
          },
        ],
      })
    },
    handleDone() {
      this.emitClose()
      console.log('done')
    },
  },
  created() {
    this.setColumns()
    this.setData()
  },
}
</script>

<style></style>
