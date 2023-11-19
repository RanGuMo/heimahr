import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从cookie中获取token
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 进度条配置 showSpinner表示旋转器是否开启（在右上角显示）

const whiteList = ['/login', '/404'] // 路由白名单


// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start() // 开启进度条

  document.title = getPageTitle(to.meta.title) //设置页面标题
  const hasToken = getToken() //根据token 确认用户是否登录

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' }) // 如果已经登录，中转到主页
      NProgress.done() // next(地址) 并不会执行后置守卫，所以需要 手动处理进度条
    } else {
      next() //放行
    }
  } else {
    //没有token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

// 路由后置守卫
router.afterEach(() => {
  NProgress.done() // 进度条完成
})
