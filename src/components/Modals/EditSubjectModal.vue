<template>
  <CModal @click="emitClose">
    <CForm>
      <CModalBody>
        <CRow class="mb-4">
          <CCol sm="3">
            <CFormLabel for="subjectName" class="col-form-label fw-semibold">
              Subject
            </CFormLabel>
          </CCol>
          <CCol sm="6">
            <CFormInput
              type="text"
              id="subjectName"
              :value="data.subjectName"
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
          :hasEdit="true"
          @deleteClick="handleDeleteClass"
          :hasDelete="true"
          @addClick="handleAddClass"
          :hasAdd="true"
        >
          <template #column(time)="{ value }">
            <p class="m-0" v-for="data in value" :key="data">
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
import { computed } from 'vue'
import { useStore } from 'vuex'
import DataTable from '@/components/Common/DataTable.vue'

export default {
  name: 'EditSubjectModal',
  components: {
    DataTable,
  },
  setup() {
    const store = useStore()
    const data = ref([])
    const columns = ref([])
    const classes = ref([])

    return {
      columns,
      data,
      showEditClassModal: computed(() => store.getters.showEditClassModal),
      classes,
      editedSubject: computed(() => store.getters.editedSubject),
    }
  },
  methods: {
    setColumns() {
      this.columns = [
        { data: 'classCode', title: 'Class Code' },
        { data: 'time', title: 'Time' },
      ]
    },
    setDatas() {
      this.data = this.$store.getters.getEditedSubject
    },
    emitClose() {
      this.$emit('close')
    },
    emitEditClass() {
      this.$emit('editClass')
    },
    toggleShowEditClassModal() {
      this.$store.dispatch('toggleEditClass')
    },
    handleEditClass(_class) {
      this.$store.dispatch('setEditedClassCode', _class.classCode)
      this.toggleShowEditClassModal()
    },
    handleDeleteClass(_class) {
      this.data.classes = this.data.classes.filter((c) => c !== _class)
    },
    handleAddClass() {
      this.$store.dispatch('setEditedClassCode', null)
      this.toggleShowEditClassModal()
    },
    handleDone() {
      this.emitClose()
      console.log('done')
    },
  },
  created() {
    this.setColumns()
    this.setDatas()
  },
  watch: {
    '$store.getters.editedSubjectID': {
      handler: function () {
        this.setDatas()
      },
    },
  },
}
</script>

<style></style>
