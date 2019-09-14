/**
 * 页面所有的下拉框请求
 *
 */

import request from '@/utils/request'

// 角色数据
export function selectRoleList(params = {}) {
  return request({
    url: '/api/user/selectRoleList',
    method: 'get',
    params
  })
}

// 项目数据
export function selectAllProject(params = {}) {
  return request({
    url: '/api/user/selectAllProject',
    method: 'get',
    params
  })
}

// 中心数据
export function selectCenterList(params = {}) {
  return request({
    url: '/api/dashBroad/selectCenterList',
    method: 'get',
    params
  })
}

// 查询所有form表单
export function selectFormList(params = {}) {
  return request({
    url: '/api/project/selectFormList',
    method: 'get',
    params
  })
}

