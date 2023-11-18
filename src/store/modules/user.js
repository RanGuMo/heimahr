import { getToken,setToken,removeToken } from "@/utils/auth"
const state = {
  token: getToken() // 1.从缓存中读取初始值
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token) // 2.同步到缓存
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
    // 返回一个token 123456
    context.commit('setToken', 123456)
  },
}
export default {
   namespaced: true, //开启命名空间，代表使用时需要携带 user/ 例如： this.$store.dispatch("user/login", this.loginForm)
   state,
   mutations,
   actions
}
