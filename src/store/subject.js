export default {
  state: () => ({
    subjects: [
      {
        id: 1,
        subjectName: 'C Intro',
        subjectCode: 'IT123',
        classes: [
          {
            classCode: '101001',
            time: [
              { day: 'Mon', startTime: '06:45', endTime: '08:00' },
              { day: 'Tue', startTime: '06:45', endTime: '08:00' },
            ],
          },
          {
            classCode: '101002',
            time: [
              { day: 'Wed', startTime: '06:45', endTime: '08:00' },
              { day: 'Thu', startTime: '06:45', endTime: '08:00' },
            ],
          },
        ],
      },
      {
        id: 2,
        subjectName: 'C Basic',
        subjectCode: 'IT124',
        classes: [
          {
            classCode: '101003',
            time: [
              { day: 'Mon', startTime: '06:45', endTime: '08:00' },
              { day: 'Tue', startTime: '06:45', endTime: '08:00' },
            ],
          },
          {
            classCode: '101004',
            time: [
              { day: 'Wed', startTime: '06:45', endTime: '08:00' },
              { day: 'Thu', startTime: '06:45', endTime: '08:00' },
            ],
          },
        ],
      },
      {
        id: 3,
        subjectName: 'C Advanced',
        subjectCode: 'IT125',
        classes: [
          {
            classCode: '101005',
            time: [{ day: 'Tue', startTime: '06:45', endTime: '08:00' }],
          },
          {
            classCode: '101006',
            time: [{ day: 'Thu', startTime: '06:45', endTime: '08:00' }],
          },
        ],
      },
    ],
    showEditSubjectModal: false,
    showEditClassModal: false,
    editedSubjectID: null,
    editedClassCode: null,
  }),
  getters: {
    subjects(state) {
      return state.subjects
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
      return state.subjects.find(
        (subject) => subject.id === state.editedSubjectID,
      )
    },
    getEditedClass(state, getters) {
      return getters.getEditedSubject.classes.find(
        (c) => c.classCode === state.editedClassCode,
      )
    },
  },
  mutations: {
    setEditedSubjectID(state, value) {
      state.editedSubjectID = value
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
    addSubject(state, value) {
      state.subjects.push(value)
    },
    editSubject(state, value) {
      const index = state.subjects.findIndex(
        (obj) => obj.subject_name == value.subject_name,
      )
      state.subjects[index] = value
    },
    deleteSubject(state, value) {
      const index = state.subjects.findIndex(
        (obj) => obj.subject_name == value.subject_name,
      )
      state.subjects.slide(index, 1)
    },
  },
  actions: {
    setEditedSubjectID(context, payload) {
      return context.commit('setEditedSubjectID', payload)
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
  },
}
