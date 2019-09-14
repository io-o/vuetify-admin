import { login, logOut } from '@/api/user'
import { resetRouter } from '@/router'

const state = {
  token: sessionStorage.getItem('token'),
  name: sessionStorage.getItem('name'),
  avatar: '',
  navData: [],
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    sessionStorage.setItem('token', token)
  },
  SET_NAME: (state, name) => {
    state.name = name
    sessionStorage.setItem('name', name)
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_NAVDATA: (state, navData) => {
    state.navData = navData
  }
  // SET_ROUTER: (state, data) => {
  //   state.roles = data
  // }

}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ loginName: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_NAME', data.loginName)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logOut().then(() => {
        sessionStorage.removeItem('token')
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      sessionStorage.removeItem('token')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

