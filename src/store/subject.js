export default {
  state: () => ({
    allSubjects: [
      // {
      //   subjectName: 'C Intro',
      //   subjectCode: 'IT123',
      //   classes: [
      //     {
      //       classCode: '101001',
      //       time: [
      //         { day: 'Mon', startTime: '06:45', endTime: '08:00' },
      //         { day: 'Tue', startTime: '06:45', endTime: '08:00' },
      //       ],
      //     },
      //     {
      //       classCode: '101002',
      //       time: [
      //         { day: 'Wed', startTime: '06:45', endTime: '08:00' },
      //         { day: 'Thu', startTime: '06:45', endTime: '08:00' },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   subjectName: 'C Basic',
      //   subjectCode: 'IT124',
      //   classes: [
      //     {
      //       classCode: '101003',
      //       time: [
      //         { day: 'Mon', startTime: '06:45', endTime: '08:00' },
      //         { day: 'Tue', startTime: '06:45', endTime: '08:00' },
      //       ],
      //     },
      //     {
      //       classCode: '101004',
      //       time: [
      //         { day: 'Wed', startTime: '06:45', endTime: '08:00' },
      //         { day: 'Thu', startTime: '06:45', endTime: '08:00' },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   subjectName: 'C Advanced',
      //   subjectCode: 'IT125',
      //   classes: [
      //     {
      //       classCode: '101005',
      //       time: [{ day: 'Tue', startTime: '06:45', endTime: '08:00' }],
      //     },
      //     {
      //       classCode: '101006',
      //       time: [{ day: 'Thu', startTime: '06:45', endTime: '20:00' }],
      //     },
      //   ],
      // },
    ],
    subjects: [],
    schedules: [],
    showEditSubjectModal: false,
    showEditClassModal: false,
    editedSubjectID: null,
    editedClassCode: null,
    editedSubject: {},
    subjectName: '',
  }),
  getters: {
    allSubjects(state) {
      return state.allSubjects
    },
    subjects(state) {
      return state.subjects
    },
    subjectName(state) {
      return state.subjectName
    },
    schedules(state) {
      return state.schedules
    },
    reformatedSubject(state) {
      let reformatedSubjects = []
      let _classCode = []
      let _time = []

      state.subjects.forEach((subject) => {
        subject.classes.forEach((c) => {
          c.time.forEach((t, index) => {
            _classCode.push(index === 0 ? c.classCode : ' ' + c.classCode)
            _time.push(t)
          })
        })

        reformatedSubjects.push({
          id: subject.id,
          subjectName: subject.subjectName,
          subjectCode: subject.subjectCode,
          classCode: _classCode,
          time: _time,
        })

        _classCode = []
        _time = []
      })

      // console.log(reformatedSubjects)
      return reformatedSubjects
    },
    showEditSubjectModal(state) {
      return state.showEditSubjectModal
    },
    showEditClassModal(state) {
      return state.showEditClassModal
    },
    editedSubjectID(state) {
      return state.editedSubjectID
    },
    editedClassCode(state) {
      return state.editedClassCode
    },
    getEditedSubject(state) {
      // return state.subjects.find(
      // (subject) => subject.id === state.editedSubjectID,
      // )
      return state.editedSubject
    },
    getEditedClass(state, getters) {
      return getters.getEditedSubject.classes.find(
        (c) => c.classCode === state.editedClassCode,
      )
    },
  },
  mutations: {
    setAllSubjects(state, value) {
      state.allSubjects = value
    },
    setSubjects(state, value) {
      state.subjects = value
    },
    setSubjectName(state, value) {
      state.subjectName = value
    },
    setSchedules(state, value) {
      state.schedules = value
    },
    setEditedSubjectID(state, value) {
      state.editedSubjectID = value
    },
    setEditedSubject(state, value) {
      if(value) {
        const index = state.subjects.findIndex((obj) => obj.subjectCode == value)
        state.editedSubject = JSON.parse(JSON.stringify(state.subjects[index])) 
      } else {
        state.editedSubject = {
          subjectName: state.subjectName,
          classes:[]
        }
      }
      
      
      // Object.assign(state.editedSubject, state.subjects[index]);
      // state.editedSubject = state.subjects[index]
    },
    setEditedClassCode(state, value) {
      state.editedClassCode = value
    },
    toggleEditSubject(state) {
      state.showEditSubjectModal = !state.showEditSubjectModal
    },
    toggleEditClass(state) {
      state.showEditSubjectModal = !state.showEditSubjectModal
      state.showEditClassModal = !state.showEditClassModal
    },
    editClass(state, value) {
      // console.log(state.editedSubject)
      // if(Object.keys(state.editedSubject) > 0){
        const index = state.editedSubject.classes.findIndex(
          (obj) => obj.classCode === value.classCode,
        )
        if (index > -1) {
          state.editedSubject.classes[index] = value.new
        } else {
          state.editedSubject.classes.push(value.new)
        }
      // } else {
      //   state.editedSubject.classes.push(value.new)
      // }
      
    },
    addSubject(state, value) {
      state.subjects.push(value)
      const newValue = JSON.parse(JSON.stringify(value)) 
      state.allSubjects.push(newValue)
    },
    editSubject(state, value) {
      const index = state.subjects.findIndex(
        (obj) => obj.subjectCode == value.subjectCode,
      )
      const index1 = state.allSubjects.findIndex(
        (obj) => obj.subjectCode == value.subjectCode,
      )
      state.subjects[index] = value
      state.allSubjects[index1] = value
    },
    deleteSubject(state, value) {
      const index = state.subjects.findIndex(
        (obj) => obj.subjectCode == value,
      )
      // console.log(index)
      state.subjects.splice(index, 1)
    },
    deleteAllSubject(state){
      state.subjects = []
    }
  },
  actions: {
    setAllSubjects(context, payload) {
      return context.commit('setAllSubjects', payload)
    },
    setSubjects(context, payload) {
      return context.commit('setSubjects', payload)
    },
    setSubjectName(context, payload) {
      return context.commit('setSubjectName', payload)
    },
    setSchedules(context, payload) {
      return context.commit('setSchedules', payload)
    },
    setEditedSubjectID(context, payload) {
      return context.commit('setEditedSubjectID', payload)
    },
    setEditedSubject(context, payload) {
      return context.commit('setEditedSubject', payload)
    },
    setEditedClassCode(context, payload) {
      return context.commit('setEditedClassCode', payload)
    },
    toggleEditSubject(context) {
      return context.commit('toggleEditSubject')
    },
    toggleEditClass(context) {
      return context.commit('toggleEditClass')
    },
    editClass(context, payload) {
      return context.commit('editClass', payload)
    },
    editSubject(context, payload) {
      return context.commit('editSubject', payload)
    },
    addSubject(context, payload) {
      return context.commit('addSubject', payload)
    },
    deleteSubject(context, payload) {
      return context.commit('deleteSubject', payload)
    },
    deleteAllSubject(context) {
      return context.commit('deleteAllSubject')
    },
  },
}
