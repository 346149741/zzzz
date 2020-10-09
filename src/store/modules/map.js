const state = {
  currentMap: undefined,
  currentModel: undefined,
  toolMap: false
}
const mutations = {
  setCurrentMap: (state, map) => {
    // map2d map3d
    state.currentMap = map
  },
  setCurrentModel: (state, model) => {
    state.currentModel = model
  },
  setToolMap: (state, model) => {
    state.toolMap = model
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

