import axios from 'axios'
import store from '@/store'
import Message from 'vue-m-message'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, //  前端要设置跨域的话 需要把baseURL设置为 空字符串
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = sessionStorage.getItem('token')
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    const res = response.data
    if (res.code !== 0) {
      Message.error(res.msg)
      if (res.code === 3) {
        setTimeout(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        }, 1000)
        return
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    // 提示错误消息
    Message.error(error.message)
    return Promise.reject(error)
  }
)

export default service
