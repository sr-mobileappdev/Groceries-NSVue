import Buefy from 'buefy'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Notifications from 'vue-notification'
import { sync } from 'vuex-router-sync'

import config from '@/config'

import App from './App'
import cognitoAuth from './cognito'
import router from './router'
import store from './store'
import intercept from './store/actions/intercept.js';

import "../node_modules/ag-grid/dist/styles/ag-grid.css";
import "../node_modules/ag-grid/dist/styles/ag-theme-balham.css";

import "ag-grid-enterprise/main";
import {LicenseManager} from "ag-grid-enterprise/main";

import "ag-grid-enterprise";
import "bulma";

// set up license key for enterprise mode
LicenseManager.setLicenseKey(config.license);

Vue.config.productionTip = false

Vue.use(Buefy, {
    defaultIconPack: 'fa'
})

Vue.use(Notifications)
Vue.use(Vuetify)

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    router.push('/')
  }
  next()
})

sync(store, router)

new Vue({
  el: '#app',
  render: (h) => h(App),
  cognitoAuth,
  router,
  store
})
