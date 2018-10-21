<template>
  <div class="box is-clearfix">
    <div class="select is-pulled-left">
      <select v-model="network" @change="changeNetwork">
        <option value=''>All Networks</option>
        <option>Outbrain</option>
        <option>Yahoo</option>
      </select>
    </div>

    <div class="select is-pulled-left">
      <select v-model="domain" @change="changeDomain">
        <option value=''>All Domains</option>
        <option>Absolutehistory.com</option>
        <option>Cafecrime.com</option>
        <option>Maternityweek.com</option>
        <option>Newravel.com</option>
        <option>Petsdetective.com</option>
        <option>Scribol.com</option>

      </select>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Dropdown',
    props: ['setNetwork', 'setDomain'],
    data () {
      return {
        network: '',
        domain: ''
      }
    },
    methods: {
      changeNetwork () {
        this.setNetwork(this.network.toLowerCase());
      },
      changeDomain () {
        this.setDomain(this.domain.toLowerCase());
      }
    }
  }
</script>

<style scoped>
  .select {
    margin-right: 10px;
  }
</style>
