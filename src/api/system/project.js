import request from '@/utils/request'

// 查询所有检测类型
export function selectTypeList() {
  return request({
    url: '/api/project/selectTypeList',
    method: 'get'
  })
}

// 新增项目
export function addProject(data) {
  return request({
    url: '/api/project/addProject',
    method: 'post',
    data
  })
}

// 配置表单
export function addProjectTypeForm(data) {
  return request({
    url: '/api/project/addProjectTypeForm',
    method: 'post',
    data
  })
}

// 查询项目某一类型下的表单
export function selectProjectTypeForms(params) {
  return request({
    url: '/api/project/selectProjectTypeForms',
    method: 'get',
    params
  })
}

// 查询该项目做的所有检查类型
export function selectTypeByProject(params) {
  return request({
    url: '/api/project/selectTypeByProject',
    method: 'get',
    params
  })
}
