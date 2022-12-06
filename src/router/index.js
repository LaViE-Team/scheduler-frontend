import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import nProgress from 'nprogress'

const router = createRouter({
  history: createWebHistory(
    import.meta ? import.meta?.env?.BASE_URL : process.env.BASE_URL,
  ),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

router.beforeEach(() => {
  // Start NProgress UI
  nProgress.start()

  // Remove last trailing slashes
  // if (/\/{1,}$/.test(to.fullPath)) {
  //   return to.fullPath.replace(/\/{1,}$/, '')
  // }
})

router.afterEach(() => {
  // Set document title from route meta
  // const defaultDocumentTitle = i18n.global.t('defaultTitle')

  // if (to?.meta?.title) {
  //   document.title = `${to.meta.title} — ${defaultDocumentTitle}`
  // } else {
  //   document.title = defaultDocumentTitle
  // }

  // Finish NProgress UI
  nProgress.done()
})

export default router
