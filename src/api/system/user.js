import request from '@/utils/request'

// table查询
export function selectUserTable(data) {
  return request({
    url: '/api/user/selectUserTable',
    method: 'post',
    data
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/api/user/addUser',
    method: 'post',
    data
  })
}

// 编辑
export function editUserMessage(params) {
  return request({
    url: '/api/user/editUserMessage',
    method: 'get',
    params
  })
}

// 提交
export function editUser(data) {
  return request({
    url: '/api/user/editUser',
    method: 'post',
    data
  })
}

// 查询所有中心下拉
export function selectAllCenterList(params) {
  return request({
    url: '/api/user/selectAllCenterList',
    method: 'get',
    params
  })
}
