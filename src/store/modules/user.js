import { getToken, setToken, removeToken } from "@/utils/auth"
import { login, getUserInfo } from "@/api/user"
import { constantRoutes } from '@/router'
import { resetRouter } from '@/router'

const state = {
  token: getToken(), // 1.从缓存中读取初始值
  userInfo: {}, //存储用户基本信息
  routes: constantRoutes // 静态路由的数组
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token) // 2.同步到缓存
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  removeToken(state) {
    state.token = null  // 3.删除Vuex的token
    removeToken()
  },
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes] // 静态路由 + 动态路由
  }
}
const actions = {
  // context上下文，传入参数
  async login(context, data) {
    console.log(data)
    // todo: 调用登录接口
    const token = await login(data)
    // 返回一个token
    context.commit('setToken', token)
  },
  async getUserInfo(context) {
    const userInfo = await getUserInfo()
    context.commit('setUserInfo', userInfo)
    return userInfo // 返回数据
  },
  //退出登录
  logout(context) {
    context.commit('removeToken') // 删除token
    context.commit('setUserInfo', {}) // 设置用户信息为空对象
    // 重置路由
    resetRouter()
  }
}
export default {
   namespaced: true, //开启命名空间，代表使用时需要携带 user/ 例如： this.$store.dispatch("user/login", this.loginForm)
   state,
   mutations,
   actions
}
