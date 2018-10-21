// initial state
const state = {
  menuOpen: false
}

// mutations
const mutations = {
  SET_MENU_OPEN (state, open) {
    state.menuOpen = open
  },
}

export default {
  state,
  mutations
}
