<template>
  <CCard>
    <CCardBody>
      <!-- Page Title -->
      <CCardTitle component="h1" class="mb-4 text-center">Schedule</CCardTitle>
      <CRow class="d-flex mb-4">
        <CCol xs="7" class="d-grid gap-2 d-md-flex justify-content-md-start">
          <CButton @click="newSchedule()" color="success">New Schedule</CButton>
        </CCol>
        <CCol xs="5" class="d-grid gap-2 d-md-flex justify-content-md-end">
          <CDropdown color="primary">
            <CDropdownToggle color="primary">{{ type }} </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem role="button" @click="choosetype(1)"
                >Type of Schedule</CDropdownItem
              >
              <CDropdownItem role="button" @click="choosetype(2)"
                >High Density</CDropdownItem
              >
              <CDropdownItem role="button" @click="choosetype(3)"
                >Low Density</CDropdownItem
              >
            </CDropdownMenu>
          </CDropdown>
        </CCol>
      </CRow>
      <DataTable
        :columns="columns"
        :datas="datas"
        :pages="pages"
        :queries="queries"
        buttonDone="Export"
        hideFilters
        hideItemPerPageSelector
        hideIndex
        hideActions
        @clickButton="clickExport"
      >
        <template #column(time)="{ value }">
          <p>
            {{ value.startTime + '-' + value.endTime }}
          </p>
        </template>
      </DataTable>
    </CCardBody>
  </CCard>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { computed } from 'vue'
import DataTable from '@/components/Common/DataTable.vue'
import { CButton } from '@coreui/vue'
import { exportTimtable, generateTimtable } from '@/services/timetable'
import store from '@/store'

export default {
  name: 'ScheduleInfo',
  components: {
    DataTable,
    CButton,
  },
  setup() {
    const store = useStore()
    const value = ref({})
    const datas = ref([
      
    ])
    const columns = ref([])
    const queries = ref({})
    const types = ref([
      {
        id: 1,
        name: 'Type of Schedule',
        type: 'all',
      },
      {
        id: 2,
        name: 'High Density',
        type: 'highDensity',
      },
      {
        id: 3,
        name: 'Low Density',
        type: 'lowDensity',
      },
    ])
    const type = ref('Type of Schedule')

    return {
      types,
      type,
      value,
      datas,
      columns,
      queries,
      schedules: computed(() => store.getters.schedules),
    }
  },
  methods: {
    setColumns() {
      this.columns = [
        { data: 'time', title: 'Time' },
        { data: 'Mon', title: 'Mon' },
        { data: 'Tue', title: 'Tue' },
        { data: 'Wed', title: 'Wed' },
        { data: 'Thu', title: 'Thu' },
        { data: 'Fri', title: 'Fri' },
        { data: 'Sat', title: 'Sat' },
        { data: 'Sun', title: 'Sun' },
      ]
    },
    choosetype(type) {
      var typeSchedule = ''
      this.types.forEach((e) => {
        if (e.id == type) {
          typeSchedule = e.type
          this.type = e.name
        }
      })

      this.$router.push({
        query: { ...this.queries, type: typeSchedule },
      })
    },
    setDatas(page = 0, type = 'all') {
      this.datas = [
      {
        time: {
          startTime: '06:45',
          endTime: '08:10',
        },
        Mon: '',
        Tue: '',
        Wed: '',
        Thu: '',
        Fri: '',
        Sat: '',
        Sun: '',
      },
      {
        time: {
          startTime: '08:25',
          endTime: '10:05',
        },
        Mon: '',
        Tue: '',
        Wed: '',
        Thu: '',
        Fri: '',
        Sat: '',
        Sun: '',
      },
      {
        time: {
          startTime: '10:15',
          endTime: '11:45',
        },
        Mon: '',
        Tue: '',
        Wed: '',
        Thu: '',
        Fri: '',
        Sat: '',
        Sun: '',
      },
      {
        time: {
          startTime: '12:30',
          endTime: '14:00',
        },
        Mon: '',
        Tue: '',
        Wed: '',
        Thu: '',
        Fri: '',
        Sat: '',
        Sun: '',
      },
      {
        time: {
          startTime: '14:05',
          endTime: '15:50',
        },
        Mon: '',
        Tue: '',
        Wed: '',
        Thu: '',
        Fri: '',
        Sat: '',
        Sun: '',
      },
      {
        time: {
          startTime: '16:05',
          endTime: '17:30',
        },
        Mon: '',
        Tue: '',
        Wed: '',
        Thu: '',
        Fri: '',
        Sat: '',
        Sun: '',
      },
      ]
      var schedules = []
      if (type == 'all' || type == null) {
        schedules.push(...this.schedules.highDensity)
        schedules.push(...this.schedules.lowDensity)
      } else if (type == 'highDensity') {
        schedules.push(...this.schedules.highDensity)
      } else if (type == 'lowDensity') {
        schedules.push(...this.schedules.lowDensity)
      }

      this.pages = schedules.length
      if (schedules) {
        this.datas.forEach((e) => {
          schedules[page].forEach((day) => {
            day.time.forEach((time) => {
              if (
                this.compareTime(time.startTime, e.time.startTime) <= 0 &&
                this.compareTime(e.time.endTime, time.endTime) <= 0
              ) {
                e[time.day] = day.subjectName + '(' + day.classCode + ')'
              } else if (this.compareTime(time.startTime, e.time.startTime) >= 0 &&
                this.compareTime(e.time.endTime, time.endTime) >= 0){
                  e[time.day] = day.subjectName + '(' + day.classCode + ')'
              }
            })
          })
        })
      }
    },
    compareTime(str1, str2) {
      if (str1 === str2) {
        return 0
      }
      var time1 = str1.split(':')
      var time2 = str2.split(':')
      if (parseInt(time1[0]) > parseInt(time2[0])) {
        return 1
      } else if (
        parseInt(time1[0]) == parseInt(time2[0]) &&
        parseInt(time1[1]) > parseInt(time2[1])
      ) {
        return 1
      } else {
        return -1
      }
    },
    setQueries() {
      this.queries = this.$route.query
    },
    async clickExport() {
      const page = this.queries.page ? this.queries.page - 1 : 0
      const type = this.queries.type
      var schedules = []
      if (type == 'all' || type == null) {
        schedules.push(...this.schedules.highDensity)
        schedules.push(...this.schedules.lowDensity)
      } else if (type == 'highDensity') {
        schedules.push(...this.schedules.highDensity)
      } else if (type == 'lowDensity') {
        schedules.push(...this.schedules.lowDensity)
      }
      
      const listClass = schedules[page].map((e) => {
        return e.classCode
      }) 
      try {
        const response = await exportTimtable(listClass)
        var fileURL = window.URL.createObjectURL(new Blob([response]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'schedule.csv');
        document.body.appendChild(fileLink);
        fileLink.click();
      } catch (error) {
        console.error(error)
      }
    },
    newSchedule() {
      this.$store.dispatch('deleteAllSubject')
      this.$router.push({ name: 'SubjectInfo' })
    },
  },

  async created() {
    // console.log(this.schedules.length)
    // if (this.schedules.length == 0) await this.$router.push({ name: 'SubjectInfo' })
    this.setColumns()
    this.setDatas()
    this.setQueries()
    this.$watch(
      () => this.$route.query,
      async () => {
        if (this.$route.name === 'ScheduleInfo') {
          this.setQueries()
          // console.log(this.schedules.highDensity)
          const page = this.queries.page ? this.queries.page - 1 : 0
          const type = this.queries.type
          await this.setDatas(page, type)
        }
      },
    )
  },
  async beforeRouteEnter(to, from, next) {
    const schedules = store.state.subject.schedules
    if (schedules.length == 0) {
      return next({ name: 'SubjectInfo' })
    }
    return next()
      
  },
}
</script>
