import { login, logout, getInfo, rsa } from '@/api/base/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { getOrgType } from '@/api/base/org'
import router, { resetRouter } from '@/router'
import JSEncrypt from 'jsencrypt'

const state = {
  token: getToken(),
  id: '',
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  infos: '',
  orgType: '',
  nowmenu: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_INFO: (state, infos) => {
    state.infos = infos
  },
  SET_ORG_TYPE: (state, infos) => {
    state.orgType = infos
  },
  SET_NOW_MENU: (state, infos) => {
    state.nowmenu = infos
  }
}

const actions = {
  login({ commit }, userInfo) {
    const username = userInfo.username.trim()
    return new Promise((resolve, reject) => {
      rsa().then(res => {
        // 公钥--rsa加密算法
        const PUBLIC_KEY = res.data
        const encrypt = new JSEncrypt()
        encrypt.setPublicKey(PUBLIC_KEY)

        let encrypted = userInfo.password
        if (process.env.VUE_APP_PASSWORD_SECURITY === 'true') {
          encrypted = encrypt.encrypt(userInfo.password)
        }

        login(PUBLIC_KEY, username, encrypted, userInfo.vcCode, userInfo.vcToken, userInfo.loginCount).then(response => {
          // token设置
          commit('SET_TOKEN', response.data)
          setToken(response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const data = response.data

        if (data.rolesKey.length > 0) { // 验证返回的roles是否是一个非空数组
          commit('SET_ROLES', data.rolesKey)
        } else {
          reject('当前登录用户未划分角色！')
        }

        commit('SET_ID', data.id)
        commit('SET_NAME', data.username)
        commit('SET_AVATAR', data.photo)
        commit('SET_INFO', data)
        // commit('SET_INTRODUCTION', data.introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
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
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // Dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      resolve()
    })
  },
  getOrgType({ commit }) {
    return new Promise((resolve, reject) => {
      rsa().then(res => {
        getOrgType().then(response => {
          // 登录者部门类型设置
          commit('SET_ORG_TYPE', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
