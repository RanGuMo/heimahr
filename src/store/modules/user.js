import { getToken, setToken, removeToken } from "@/utils/auth"
import { login,getUserInfo } from "@/api/user"
const state = {
  token: getToken(), // 1.从缓存中读取初始值
  userInfo:{} //存储用户基本信息
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
  }
}
export default {
   namespaced: true, //开启命名空间，代表使用时需要携带 user/ 例如： this.$store.dispatch("user/login", this.loginForm)
   state,
   mutations,
   actions
}
