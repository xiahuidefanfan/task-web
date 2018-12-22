import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API // api的base_url
//timeout: 60000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  config.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
let flagUrl = document.location.href
service.interceptors.response.use(
  response => {
    if(response.headers && response.headers.sessionstatus == 'timeout'){
      debugger
      if(flagUrl != document.location.href){
        flagUrl = document.location.href
        MessageBox({
          title: '提示信息',
          message: '您已掉线！',
          type: 'error'
        }).then(() => {
          window.location.reload()
        })
      }      
    }else{
      const res = response.data
        if (!res.success) {
          MessageBox({
            title: '提示信息',
            message: res.msg || '未知错误！',
            type: 'error'
          })
        } else {
          return response.data
      }
    }		
  },
  error => {
    if (error.response && error.response.status >= 500) {
      MessageBox({
      	title: '错误信息',
        message: error.response.data.message || '服务器异常！',
        type: 'error'
      })
    }
    if(error.message && error.message == "Network Error"){
      if(window.location.href.indexOf("/login") <= 0){
        MessageBox({
          title: '错误信息',
          message: '您已掉线！',
          type: 'error'
        }).then(() => {
            window.location.reload()
        })
      }
    }
    return Promise.reject(error)
  }
)
export default service
