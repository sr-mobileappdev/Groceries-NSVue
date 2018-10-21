import Vue from 'vue'
import Vuex from 'vuex'

import app_state from './modules/app_state'
import campaigns from './modules/campaigns'
import columnHeaders from './modules/columnHeaders'
import columnHeadersPublisher from './modules/columnHeadersPublisher'
import config from './modules/config'

import * as app_state_actions from './actions/app_state'
import * as campaign_actions from './actions/campaigns'
import * as config_actions from './actions/config'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    app_state,
    campaigns,
    columnHeaders,
    columnHeadersPublisher,
    config,
  },
  actions: {
    ...app_state_actions,
    ...campaign_actions,
    ...config_actions,
  },
  strict: debug
})
