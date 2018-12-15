import request from '@/utils/request'

/**
 * 查询任务
 * @param params
 */
export function list( params ) {
  return request ({
    url: '/task/mission/list.action',
    method: 'post',
    params
  })
}

/**
 * 添加任务
 * @param params
 */
export function add ( params ) {
  return request ({
    url: '/task/mission/add.action',
    method: 'post',
    params
  })
}

/**
 * 修改任务
 * @param params
 */
export function update ( params ) {
  return request ({
    url: '/task/mission/update.action',
    method: 'put',
    params
  })
}