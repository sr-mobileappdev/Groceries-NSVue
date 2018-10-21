<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        
        <a
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': menuOpen }"
          :style="{ 'opacity': burgerOpacity }"
          aria-label="menu"
          aria-expanded="false"
          @click="toggleMenu() "
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>

        <a class="navbar-item navbar-item__logo" href="#">
          <img src="static/img/logo.png" width="112" height="28">
        </a>
      
      </div>

      <div
        class="navbar-menu"
        :class="{ 'is-active': nav_toggled }"
      >
        <div class="navbar-end"> 
          <div class="navbar-item">
            <a href="#">Placeholder</a>
          </div>
        </div>
      </div>
      
    </nav>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'Navbar',
    data () {
      return {
        nav_toggled: false
      }
    },
    computed: {
      ...mapState({
        menuOpen: (state) => state.app_state.menuOpen
      }),
      burgerOpacity () {
        let hideOn = [
          '/',
          '/login',
          '/signup',
          '/confirm',
          '/reset_password',
          '/confirm_reset_password'
        ]
        return (hideOn.indexOf(this.$route.path) == -1) ? 1 : 0
      }
    },
    methods: {
      ...mapActions([
        'setMenuOpen'
      ]),
      toggleMenu () {
        this.setMenuOpen(!this.menuOpen)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    background: #333;
    .navbar-burger {
      margin-left: 0;
      display: block;
    }
    a, .navbar-item a {
      transition: color .2s;
      color: #eee;
      &:hover {
        color: #ccc;
      }
    }
    .navbar-menu a {
      transition: color .2s;
      color: #333;
      &:hover {
        color: #555;
      }
    }
    .navbar-item__logo {
      &:hover {
        background: transparent !important;
      }
    }
  }
</style>