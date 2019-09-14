import request from '@/utils/request'

// 新增中心
export function addCenter(data) {
  return request({
    url: '/api/centerManage/addCenter',
    method: 'post',
    data
  })
}

// 更新中心
export function editCenter(data) {
  return request({
    url: '/api/centerManage/editCenter',
    method: 'post',
    data
  })
}

// 编辑中心
export function editCenterMessage(params) {
  return request({
    url: '/api/centerManage/editCenterMessage',
    method: 'get',
    params
  })
}

// 中心table
export function selectCenterTable(data) {
  return request({
    url: '/api/centerManage/selectCenterTable',
    method: 'post',
    data
  })
}
