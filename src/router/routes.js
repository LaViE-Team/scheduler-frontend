import { h, resolveComponent } from 'vue'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/homepage',
    children: [
      {
        path: '/homepage',
        name: 'Homepage',
        component: () => import('@/views/home/Home.vue'),
      },
      {
        path: '/schedule',
        name: 'Schedule',
        component: () => import('@/views/schedule/Schedule.vue'),
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
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },
      {
        path: 'login',
        name: 'PageLogin',
        component: () => import('@/views/pages/Login'),
      },
      {
        path: 'register',
        name: 'PageRegister',
        component: () => import('@/views/pages/Register'),
      },
    ],
  },
]

export default routes
