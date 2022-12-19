import { h, resolveComponent } from 'vue'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: { name: 'Homepage' },
    children: [
      {
        path: '/homepage',
        name: 'Homepage',
        component: () => import('@/views/home/Home.vue'),
      },
      {
        path: '/schedule',
        name: 'Schedule',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: { name: 'SubjectInfo' },
        children: [
          {
            path: '',
            name: 'SubjectInfo',
            component: () => import('@/views/schedule/Schedule.vue'),
          },
          {
            path: 'info',
            name: 'ScheduleInfo',
            component: () => import('@/views/schedule/ScheduleInfo.vue'),
          },
        ],
      },
      {
        path: '/account',
        name: 'Account',
        component: () => import('@/views/account/Account.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/Register.vue'),
  },
]

export default routes
