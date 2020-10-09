const state = {
  detail: {}
}

const mutations = {
  setLogoDetail: (state, detail) => {
    state.detail = detail
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
