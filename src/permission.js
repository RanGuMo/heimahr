import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从cookie中获取token
import getPageTitle from '@/utils/get-page-title'
import { asyncRoutes } from '@/router'

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
      //  判断是否获取过用户信息
      if (!store.getters.userId) { //如果vuex没有用户信息，就再次获取 (写错单词了 userId，写成了userInfo)
        const { roles } = await store.dispatch('user/getUserInfo')
        // console.log(roles.menus) // 数组 不确定 可能是8个 1个 0个
        // console.log(asyncRoutes) // 数组 8个
        const filterRoutes = asyncRoutes.filter(item => {
          // return true/false
          return roles.menus.includes(item.name)
        }) // 筛选后的路由
        console.log(filterRoutes,111111111111111111111111111111111111111111);
        router.addRoutes([...filterRoutes, { path: '*', redirect: '/404', hidden: true }]) // 添加动态路由信息到路由表
        // router添加动态路由之后 需要转发一下
        next(to.path) // 目的是让路由拥有信息 router的已知缺陷
      } else {
        next() // 放过
      }
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
