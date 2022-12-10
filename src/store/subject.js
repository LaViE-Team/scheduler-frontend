export default {
  state: () => ({
    subjects: [
      {
        id: 1,
        subject_name: 'Cbasic',
        subject_code: 'IT12',
        class: [
          {
            class_id: 'IT123',
            time: [
              {
                day: 'wed',
                start: '6h45',
                end: '8h',
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: 'Cbasic',
        subject_id: 'IT12',
        class: [
          {
            classCode: 'IT123',
            time: [
              {
                day: 'wed',
                start: '6h45',
                end: '8h',
              },
            ],
          },
        ],
      },
      {
        id: 3,
        name: 'Cbasic',
        subject_id: 'IT12',
        class: [
          {
            classCode: 'IT123',
            time: [
              {
                day: 'wed',
                start: '6h45',
                end: '8h',
              },
            ],
          },
        ],
      },
    ],
  }),
  getters: {
    subjects(state) {
      return state.subjects
    },
  },
  mutations: {
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
  actions: {},
}
