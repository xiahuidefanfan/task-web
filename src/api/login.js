import request from '@/utils/request'

// 使用用户名登录
export function loginByUsername(data) {
  return request({
  	headers: {
  		'Content-Type': 'application/x-www-form-urlencoded',
  	},
    url: '/task/login.action',
    method: 'post',
    data
  })
}

// 退出系统
export function logout() {
  return request({
    url: '/task/logout.action',
    method: 'get'
  })
}

// 获取当前登录用户的信息
export function getUserInfo() {
  return request({
    url: '/task/user/userInfo.action',
    method: 'get'
  })
}

