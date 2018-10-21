// initial state
const state = {
  all: null
}

// mutations
const mutations = {
  SET_CONFIG (state, config) {
    state.all = config
  },
}

export default {
  state,
  mutations
}
