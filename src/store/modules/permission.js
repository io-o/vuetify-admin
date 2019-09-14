import { constantRoutes } from '@/router'
import { map } from '@/router/config'
import Layout from '@/layout'
import { queryRoleMenu } from '@/api/user'

// 路由数据

// import routes from '../../../mock/menu'

/*
  递归后端路由，处理成前端可识别路由
*/
export function filterAsyncRoutes(routes) {
  const arr = routes.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = map[route.component]
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRoutes(route.children)
    }
    return true
  })

  return arr
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // 模拟路由数据
      queryRoleMenu()
        .then(res => {
          const accessedRoutes = filterAsyncRoutes(res.data)
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        })
    })
  }

  // removeRoutes() {
  //   return new Promise(resolve => {
  //     commit('SET_ROUTES', [])
  //     resolve()
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
