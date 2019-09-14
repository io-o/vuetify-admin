import request from '@/utils/request'

// 新增权限角色
export function addRole(data) {
  return request({
    url: '/api/role/addRole',
    method: 'post',
    data
  })
}

// 更新角色
export function editRole(data) {
  return request({
    url: '/api/role/editRole',
    method: 'post',
    data
  })
}

// 编辑角色
export function editRoleMessage(params) {
  return request({
    url: '/api/role/editRoleMessage',
    method: 'get',
    params
  })
}

// 角色table
export function selectRoleTable(data) {
  return request({
    url: '/api/role/selectRoleTable',
    method: 'post',
    data
  })
}

// 查询权限树
export function selectRolePermissionTree(params) {
  return request({
    url: '/api/role/selectRolePermissionTree',
    method: 'get',
    params
  })
}
