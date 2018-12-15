import request from '@/utils/request'

/**
 * 查询需求
 * @param params
 */
export function list( params ) {
  return request ({
    url: '/task/demand/list.action',
    method: 'post',
    params
  })
}

/**
 * 添加需求
 * @param params
 */
export function add ( params ) {
  return request ({
    url: '/task/demand/add.action',
    method: 'post',
    params
  })
}

/**
 * 修改需求
 * @param params
 */
export function update ( params ) {
  return request ({
    url: '/task/demand/update.action',
    method: 'put',
    params
  })
}