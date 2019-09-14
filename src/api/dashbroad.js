/**
 * dashbroad 请求
 *
 */

import request from '@/utils/request'

// 查询项目list
export function selectProjectList() {
  return request({
    url: '/api/dashBroad/selectProjectList',
    method: 'get'
  })
}

// 项目id 查中心
export function selectCenterList(params) {
  return request({
    url: '/api/dashBroad/selectCenterList',
    method: 'get',
    params
  })
}

