<template>
  <CCard>
    <CCardBody>
      <!-- Page Title -->
      <CCardTitle component="h1" class="mb-4 text-center"
        >{{ user_name }}'s schedule</CCardTitle
      >
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
import { getUserName } from '@/utils/cookies'
import { getShare } from '@/services/share'

export default {
  name: 'ScheduleInfo',
  components: {
    DataTable,
    CButton,
  },
  setup() {
    const user_name = ref(String)
    const store = useStore()
    const value = ref({})
    const datas = ref([])
    const columns = ref([])
    const queries = ref({})
    const schedules = ref([])

    return {
      value,
      datas,
      columns,
      queries,
      schedules,
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
    async getShare() {
      try {
        const response = await getShare()
        this.schedules = response
        this.pages = this.schedules.length
      } finally {

      }
    },
    setDatas(page = 0) {
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
      // var schedules = [
      //   [
      //     {
      //       subjectCode: 'JP1132',
      //       subjectName: 'Japanese 3',
      //       classCode: '126917',
      //       time: [
      //         {
      //           day: 'Mon',
      //           startTime: '08:25',
      //           endTime: '10:05',
      //         },
      //         {
      //           day: 'Wed',
      //           startTime: '08:25',
      //           endTime: '10:05',
      //         },
      //         {
      //           day: 'Thu',
      //           startTime: '08:25',
      //           endTime: '10:05',
      //         },
      //       ],
      //     },
      //     {
      //       subjectCode: 'IT2030',
      //       subjectName: 'Technical Writing and Presentation',
      //       classCode: '126927',
      //       time: [
      //         {
      //           day: 'Mon',
      //           startTime: '12:30',
      //           endTime: '15:50',
      //         },
      //       ],
      //     },
      //     {
      //       subjectCode: 'IT2120',
      //       subjectName: 'Computer Information',
      //       classCode: '126937',
      //       time: [
      //         {
      //           day: 'Mon',
      //           startTime: '16:05',
      //           endTime: '17:30',
      //         },
      //       ],
      //     },
      //     {
      //       subjectCode: 'IT2140',
      //       subjectName: 'Electric Lab',
      //       classCode: '128539',
      //       time: [
      //         {
      //           day: 'Wed',
      //           startTime: '06:45',
      //           endTime: '08:10',
      //         },
      //       ],
      //     },
      //     {
      //       subjectCode: 'IT4015',
      //       subjectName: 'Security',
      //       classCode: '126915',
      //       time: [
      //         {
      //           day: 'Thu',
      //           startTime: '12:30',
      //           endTime: '15:50',
      //         },
      //       ],
      //     },
      //   ],
      // ]

      //   this.pages = schedules.length

      if (this.schedules) {
        this.datas.forEach((e) => {
          this.schedules[page].forEach((day) => {
          // schedules[0].forEach((day) => {
            day.time.forEach((time) => {
              if (
                this.compareTime(time.startTime, e.time.startTime) <= 0 &&
                this.compareTime(e.time.endTime, time.endTime) <= 0
              ) {
                e[time.day] = day.subjectName + '(' + day.classCode + ')'
              } else if (
                this.compareTime(time.startTime, e.time.startTime) >= 0 &&
                this.compareTime(e.time.endTime, time.endTime) >= 0
              ) {
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
      console.log('Export')
      //   const page = this.queries.page ? this.queries.page - 1 : 0
      //   var schedules = []
      //   if (type == 'all' || type == null) {
      //     schedules.push(...this.schedules.highDensity)
      //     schedules.push(...this.schedules.lowDensity)
      //   } else if (type == 'highDensity') {
      //     schedules.push(...this.schedules.highDensity)
      //   } else if (type == 'lowDensity') {
      //     schedules.push(...this.schedules.lowDensity)
      //   }

      //   const listClass = schedules[page].map((e) => {
      //     return e.classCode
      //   })
      //   try {
      //     const response = await exportTimtable(listClass)
      //     var fileURL = window.URL.createObjectURL(new Blob([response]))
      //     var fileLink = document.createElement('a')
      //     fileLink.href = fileURL
      //     fileLink.setAttribute('download', 'schedule.csv')
      //     document.body.appendChild(fileLink)
      //     fileLink.click()
      //   } catch (error) {
      //     console.error(error)
      //   }
    },
  },

  async created() {
    // console.log(this.schedules.length)
    // if (this.schedules.length == 0) await this.$router.push({ name: 'SubjectInfo' })
    await this.getShare()
    this.user_name = getUserName()
    this.setColumns()
    this.setDatas()
    this.setQueries()
    this.$watch(
      () => this.$route.query,
      async () => {
        if (this.$route.name === 'Share') {
          this.setQueries()
          // console.log(this.schedules.highDensity)
          const page = this.queries.page ? this.queries.page - 1 : 0
          await this.setDatas(page)
        }
      },
    )
  },
}
</script>
