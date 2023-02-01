<template>
    <CModal alignment="center" size="sm" @click="emitClose">
      <CModalBody>
        <CRow class="mb-3 align-items-start">
          <CFormLabel class="col-sm-6 col-form-label">Account name</CFormLabel>
          <div class="col-sm-6">
            <CFormInput v-model="accountName" @keyup.enter="submit"/>
          </div>
        </CRow>
        <CCard>
          <CCardHeader>Account name</CCardHeader>
          <CListGroup v-for="user in listUser" flush>
            <CListGroupItem>{{ user }}</CListGroupItem>
          </CListGroup>
        </CCard>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="emitClose">Cancel</CButton>
        <CButton color="primary" @click="emitClose">Done</CButton>
      </CModalFooter>
    </CModal>
</template>

<script>
import { ref } from '@vue/reactivity'
import { computed } from 'vue'
import { useStore } from 'vuex'
// import DataTable from '@/components/Common/DataTable.vue'
import { CCardHeader, CTableHeaderCell } from '@coreui/vue'
import { shareTimtable } from '@/services/share'
import { useToast } from 'vue-toastification'

export default {
  name: 'ShareModal',
  components: {
    // DataTable,
    CTableHeaderCell,
    CCardHeader
},
  setup() {
    const store = useStore()
    const accountName = ref()
    const toast = useToast()
    const listUser = ref(['...'])
    
    return {
        showShare: computed(() => store.getters.showShare),
        schedule: computed(() => store.getters.shareSchedule),
        accountName,
        toast,
        listUser,
    }
  },
  methods: {
    emitClose() {
      this.$emit('close')
    },
    async submit() {
      try {
        const data = {
          share_with: this.accountName,
          timetable_classes: this.schedule
        }
        console.log(data)
        const response = await shareTimtable(data)
        if (response.status == 'failed') {
          this.toast.error(response.msg)
        } else {
          this.listUser.unshift(this.accountName)
          this.accountName = ''
        }
      } finally {

      }
      console.log(this.accountName)
      console.log(this.schedule)
    }
  },
  created(){
    console.log(this.schedule)
  }
}
</script>
