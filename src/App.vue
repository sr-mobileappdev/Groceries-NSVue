<template>
  <div id="app">
    <navbar/>
    <drawer/>
    <router-view/>
    <notifications
      group="main"
      position="bottom right"
    />
  </div>
</template>

<script>
  import Drawer from './components/Menu'
  import Navbar from './components/Navbar'

  export default {
    name: 'App',
    components: {
      Drawer,
      Navbar
    }
  }
</script>

<style>
  @import "../node_modules/bulma/css/bulma.css";
  @import "../node_modules/ag-grid/dist/styles/ag-grid.css";
  @import "../node_modules/ag-grid/dist/styles/ag-theme-material.css";
</style>
