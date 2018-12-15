import request from '@/utils/request'

/**
 * 查询角色
 * @param params
 */
export function list (params) {
  return request ({
    url: '/task/role/list.action',
    method: 'post',
    params
  })
}


/**
 * 添加角色
 * @param params
 */
export function add (params) {
  return request ({
    url: '/task/role/add.action',
    method: 'post',
    params
  })
}


/**
 * 更新角色
 * @param params
 */
export function update (params) {
  return request ({
    url: '/task/role/update.action',
    method: 'put',
    params
  })
}

/**
 * 删除角色
 * @param params
 */
export function del (params) {
  return request ({
    url: '/task/role/del.action',
    method: 'delete',
    params
  })
}

/**
 * 获取角色树
 * @param params
 */
export function queryRoleTree (params) {
  return request ({
    url: '/task/role/queryRoleTree.action',
    method: 'get',
    params
  })
}

/**
 * 角色授权
 * @param params
 */
export function setAuthority (params) {
  return request ({
    url: '/task/role/setAuthority.action',
    method: 'post',
    params
  })
}

