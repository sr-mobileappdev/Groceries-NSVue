import axios from 'axios'

export const setConfig = function ({ commit, state }, config) {
  commit('SET_CONFIG', config)
}