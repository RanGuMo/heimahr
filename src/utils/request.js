import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建一个axios 实例
const service = axios.create({
  // baseURL: '/api', // url = base url + request url
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 10000 // 请求超时时间设置为10秒
})

// 请求拦截器
// 第一个参数，成功，第二个参数 失败
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
      // config.headers['Authorization'] = "Bearer "+getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error) //失败执行promise
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // aixos 默认包裹了data，所以需要从response.data 取出
    const { data, message, success } = response.data
    if (success) {
      return data
    } else {
      Message({
        message: message,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(new Error(message))
    }

  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
