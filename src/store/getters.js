const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.userInfo.staffPhoto,//头像
  name: state => state.user.userInfo.username, //用户名称
  userId: state => state.user.userInfo.userId, //添加userId的快捷访问方式，通过是否存在userId来判断vuex中是否存在用户信息，如果不存在就在前置路由守卫中重新获取一次
  routes: state => state.user.routes
}
export default getters
