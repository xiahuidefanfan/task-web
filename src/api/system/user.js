import request from '@/utils/request'

/**
 * 查询测试人员
 */
export function queryTesters () {
  return request ({
    url: '/task/user/queryTesters.action',
    method: 'get'
  })
}  

/**
 * 查询开发人员
 */
export function queryDevelopers () {
  return request ({
    url: '/task/user/queryDevelopers.action',
    method: 'get'
  })
}