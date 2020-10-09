import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const permissions = store.getters && store.getters.userInfo.permission
    const rolesKey = store.getters.userInfo.rolesKey
    // 超级管理员不做控制
    if (rolesKey.includes('ROLE_ADMIN')) {
      return
    }
    // 没有权限则不显示元素
    if (binding) {
      if (permissions.indexOf(binding.value) === -1) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  }
}
