import request from '@/utils/request'

/**
 * 查询菜单
 * @param params
 */
export function list( params ) {
  return request ({
    url: '/task/menu/list.action',
    method: 'post',
    params
  })
}

/**
 * 添加菜单
 * @param params
 */
export function add ( params ) {
  return request ({
    url: '/task/menu/add.action',
    method: 'post',
    params
  })
}

/**
 * 修改菜单
 * @param params
 */
export function update ( params ) {
  return request ({
    url: '/task/menu/update.action',
    method: 'put',
    params
  })
}

/**
 * 禁用菜单
 * @param params
 */
export function changeStatus ( params ) {
  return request ({
    url: '/task/menu/changeStatus.action',
    method: 'put',
    params
  })
}

/**
 * 删除菜单
 * @param params
 */
export function del( params ) {
  return request ({
    url: '/task/menu/delete.action',
    method: 'post',
    params
  })
}

/**
 * 查询菜单树(可用于首页菜单展示)
 * @param params
 */
export function queryCurUserMenuNode () {
  return request ({
    url: '/task/menu/queryCurUserMenuNode.action',
    method: 'get'
  })
}

/**
 * 获取当前角色权限列表
 * @param params
 */
export function queryCurRoleAuthority (params) {
  return request ({
    url: '/task/menu/queryCurRoleAuthority.action',
    method: 'post',
    params
  })
}

/**
 * 查询菜单树
 * @param params
 */
export function queryMenuTree () {
  return request ({
    url: '/task/menu/queryMenuTree.action',
    method: 'get'
  })
}


