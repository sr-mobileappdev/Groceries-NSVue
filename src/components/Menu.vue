<template>
  <div
    class="drawer"
    :class="{'drawer-open': menuOpen}"
    v-if="visible"
  >
    <aside class="menu">
      <p class="menu-label">
        Campaign Management
      </p>
      <ul class="menu-list">
        <li>
          <router-link
            to="/campaigns"
            :class="{'is-active': $route.path == '/campaigns'}"
          >
            Campaigns
          </router-link>
        </li>
      </ul>
      <ul class="menu-list">
        <li>
          <router-link
            to="/publishers"
            :class="{'is-active': $route.path == '/publishers'}"
          >
            Publishers
          </router-link>
        </li>
      </ul>
      <p class="menu-label">
        Administration
      </p>
      <ul class="menu-list">
        <li>
          User Settings
          <ul>
            <li>
              <router-link
                to="/account"
                :class="{'is-active': $route.path == '/account'}"
              >
                Manage Account
              </router-link>
            </li>
            <li>
              <router-link to="/logout">Logout</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'Drawer',
    computed: {
      ...mapState({
        menuOpen: (state) => state.app_state.menuOpen
      }),
      visible () {
        let hideOn = [
          '/',
          '/login',
          '/signup',
          '/confirm',
          '/reset_password',
          '/confirm_reset_password'
        ]
        return hideOn.indexOf(this.$route.path) == -1
      }
    }
  }
</script>

<style lang="scss" scoped>
  .drawer {
    z-index: 9;
    padding: 20px;
    transition: transform 0.3s;
    background: #333;
    position: fixed;
    top: 52px;
    bottom: 0;
    left: 0;
    width: 280px;
    transform: translateX(-100%);
    &.drawer-open {
      transform: translateX(0);
    }
    .menu-label {
      color: #d8d8d8;
    }
    .menu-list {
      color: #888888;
      a {
        transition: all 0.2s;
        color: #888888;
        &:hover {
          background: #909090;
          color: #d8d8d8;
        }
        &.is-active {
          background: #365382;
          color: #d8d8d8;
        }
      }
    }
  }
</style>
