import Vue from 'vue'
import Router from 'vue-router'

import cognitoAuth from '@/cognito'
import Confirm from '@/components/Confirm.vue'
import Login from '@/components/Login.vue'
import Account from '@/components/Account.vue'
import PasswordReset from '@/components/PasswordReset.vue'
import PasswordResetConfirm from '@/components/PasswordResetConfirm.vue'
import Signup from '@/components/Signup.vue'
import TableCampaign from '@/components/TableCampaign'
import TablePublisher from '@/components/TablePublisher'

Vue.use(Router)

function requireAuth (to, from, next) {
  cognitoAuth.isAuthenticated((err, loggedIn) => {
    if (err) return next()
    if (!loggedIn) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  })
}

function requireNoAuth (to, from, next) {
  cognitoAuth.isAuthenticated((err, loggedIn) => {
    if (err || loggedIn) {
      next({
        path: '/campaigns',
      })
    } else {
      next()
    }
  })
}

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Login, beforeEnter: requireNoAuth },
    { path: '/login', component: Login, beforeEnter: requireNoAuth },
    { path: '/campaigns', component: TableCampaign, beforeEnter: requireAuth },
    { path: '/publishers', component: TablePublisher, beforeEnter: requireAuth },
    { path: '/signup', component: Signup, beforeEnter: requireNoAuth },
    { path: '/confirm', component: Confirm, beforeEnter: requireNoAuth },
    { path: '/account', component: Account, beforeEnter: requireAuth },
    { path: '/reset_password', component: PasswordReset, beforeEnter: requireNoAuth },
    { path: '/confirm_reset_password', component: PasswordResetConfirm },
    { path: '/logout',
      beforeEnter (to, from, next) {
        cognitoAuth.logout()
        next('/')
      }
    },
  ]
})
