const state = {
  chose: {
    label: '',
    value: ''
  },
  detail: {}
}

const mutations = {
  SET_PROJECT: (state, pro) => {
    state.chose = pro
  },
  setProDetail: (state, detail) => {
    state.detail = detail
  }
}

const actions = {
  setProChose({ commit }, pro) {
    commit('SET_PROJECT', pro)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
