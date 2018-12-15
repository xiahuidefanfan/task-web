import request from '@/utils/request'


/**
 * 查询字典
 * @param params
 */
export function list ( params ) {
  return request ({
    url: '/task/dict/list.action',
    method: 'post',
    params
  })
}

/**
 * 新增
 * @param params
 */
export function add ( params ) {
  return request ({
    url: '/task/dict/add.action',
    method: 'post',
    params
  })
}

/**
 * 修改
 * @param params
 */
export function update ( params ) {
  return request ({
    url: '/task/dict/update.action',
    method: 'put',
    params
  })
}


/**
 * 根据code查询字典
 * @param params
 */
export function queryDictByParentCode( params ) {
  return request ({
    url: '/task/dict/queryDictByParentCode.action',
    method: 'post',
    params
  })
}