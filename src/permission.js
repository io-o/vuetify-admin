import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // 设置title
  document.title = getPageTitle(to.meta.title)

  if (sessionStorage.getItem('token')) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
      const hasRoles = store.getters.permission_routes && store.getters.permission_routes.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取路由
          const accessRoutes = await store.dispatch('permission/generateRoutes')
          router.addRoutes(accessRoutes)

          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('user/resetToken')
          // Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
