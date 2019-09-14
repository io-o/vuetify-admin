/*
  前端异步路由表
*/
export const map = {
  test: () => import('@/views/test/index'),
  role: () => import('@/views/system/role/index'),
  user: () => import('@/views/system/user/index'),
  center: () => import('@/views/system/center/index'),
  project: () => import('@/views/system/project/index'),
  subject: () => import('@/views/subject/index'),
  dataCollect: () => import('@/views/subject/dataCollect'),
  tuples: () => import('@/views/ecrf/tuples/index'),
  group: () => import('@/views/ecrf/group/index'),
  form: () => import('@/views/ecrf/form/index'),
  personal: () => import('@/views/personal/index')
}
