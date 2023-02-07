<template>
  <CModal @click="emitClose">
    <CForm>
      <CModalBody>
        <CRow class="mb-4">
          <CCol sm="3">
            <CFormLabel for="subjectName" class="col-form-label fw-semibold">
              Subject Name
            </CFormLabel>
          </CCol>
          <CCol sm="6">
            <CFormInput
              v-model="subjectName"
              type="text"
              id="subjectName"
              :value="data.subjectName"
              required
            />
          </CCol>
        </CRow>
        <CRow v-if="isNew" class="mb-4">
          <CCol sm="3">
            <CFormLabel for="subjectName" class="col-form-label fw-semibold">
              Subject Code
            </CFormLabel>
          </CCol>
          <CCol sm="6">
            <CFormInput
              v-model="subjectCode"
              type="text"
              id="subjectCode"
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
import { updateData } from '@/services/schedule'
import { useToast } from 'vue-toastification'

export default {
  name: 'EditSubjectModal',
  components: {
    DataTable,
  },
  setup() {
    const isNew = ref(false)
    const subjectName = ref()
    const subjectCode = ref()
    const toast = useToast()
    const store = useStore()
    const data = ref({})
    const columns = ref([])
    const classes = ref([])

    return {
      isNew,
      subjectName,
      subjectCode,
      toast,
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
      console.log(this.data)
      if (this.data.subjectCode) {
        console.log(1)
        this.isNew = false
      } else {
        this.isNew = true
      }
      // console.log(this.data)
      this.subjectName = this.data.subjectName ? this.data.subjectName : this.$store.getters.subjectName
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
    async handleDone() {
      if (!this.isNew) {
        this.data.subjectName = this.subjectName
        await this.$store.dispatch('editSubject', this.data)
        console.log(this.$store.getters.subjects)
        try {
          const response = await updateData(this.$store.getters.allSubjects)
          if (response.status == 'successful') {
            this.toast.success('Success')
          }
        } finally {
          this.$store.dispatch('setEditedSubject', null)
          this.$store.dispatch('setSubjectName', '')
          // this.isSubmiting = false
        }
        this.$emit('resetHandleGetData')
        this.emitClose()
      } else {
        this.data = {
          ...this.data,
          subjectCode: this.subjectCode,
        }
        await this.$store.dispatch('addSubject', this.data)
        // console.log(this.$store.getters.allSubjects)
        try {
          const response = await updateData(this.$store.getters.allSubjects)
          if (response.status == 'successful') {
            this.toast.success('Success')
          }
        } finally {
          this.$store.dispatch('setEditedSubject', null)
          this.$store.dispatch('setSubjectName', '')
          // this.isSubmiting = false
        }
        this.$emit('resetHandleGetData')
        this.emitClose()
      }
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
