import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/user/info',
    method: 'post',
    data
  })
}

export function logOut() {
  return request({
    url: '/logOut',
    method: 'get'
  })
}

// 个人中心信息查询
export function selectUserDetails(params) {
  return request({
    url: '/api/personalCenter/selectUserDetails',
    method: 'get',
    params
  })
}

// 个人中心信息修改提交
export function editUserDetails(data) {
  return request({
    url: '/api/personalCenter/editUserDetails',
    method: 'post',
    data
  })
}

// 用户密码修改
export function updateUserPassword(data) {
  return request({
    url: '/api/personalCenter/updateUserPassword',
    method: 'post',
    data
  })
}

// 菜单数据
export function queryRoleMenu(params) {
  return request({
    url: '/api/personalCenter/queryRoleMenu',
    method: 'get',
    params
  })
}
