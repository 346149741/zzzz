import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param auth 用户拥有的菜单
 * @param route 路由
 */
function hasPermission(menuCodeArray, route) {
  if (route.auth) {
    return menuCodeArray.indexOf(route.auth) >= 0
  } else {
    return false
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRoutes 前端路由
 * @param auth 服务器返回的用户拥有的菜单权限
 */
function filterAsyncRoutes(asyncRoutes, menus, menuCodeArray) {
  return asyncRoutes.filter(route => {
    if (hasPermission(menuCodeArray, route)) {
      const menu = menus[route.auth]
      if (!menu) {
        return false
      }
      route.meta.title = menu.name
      route.meta.icon = menu.icon
      if (route.children && route.children.length) {
        route.children = filterAsyncRoutes(route.children, menus, menuCodeArray)
      }
      return true
    }
    return false
  })
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
      if (roles.rolesKey.includes('ROLE_ADMIN')) {
        commit('SET_ROUTES', asyncRoutes)
        resolve(asyncRoutes)
      } else {
        // 查询用户拥有哪些菜单
        const data = roles.menu
        const menuCodeArray = []
        const menus = {}
        for (let i = 0; i < data.length; i++) {
          menuCodeArray.push(data[i].code)
          menus[data[i].code] = data[i]
        }
        const accessedRoutes = filterAsyncRoutes(asyncRoutes, menus, menuCodeArray)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
