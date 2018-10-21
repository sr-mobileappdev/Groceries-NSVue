<template>
  <a class="d_btn button is-danger is-small" v-on:click="dispatch">Publisher</a>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import axios from 'axios'

  export default {
    name: 'PButton',
    props: ['param'],
    computed: {
    },
    data () {
      return {
        data: null
      };
    },
    methods: {
      dispatch() {
        // get parameters
        // let routeData = this.$router.resolve({name: 'publisher-table', query: {data: this.params.data.id}});
        // window.open(routeData.href, '_blank');
        //window.open(location.host + '/publisher-table/' + this.params.data.id);
      }
    }
  }
</script>