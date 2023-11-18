const state = {
  token: null
}
const mutations = {
  setToken(state, token) {
    state.token = token
  }
}
const actions = {
  // context上下文，传入参数
   login(context, data) {
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
