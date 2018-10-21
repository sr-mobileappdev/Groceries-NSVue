<template>
  <div class="box is-clearfix">
    <div class="select is-pulled-left">

      <multiselect
        placeholder="All Networks"
        v-model="network"
        :options="v_network"
        :multiple="true"
        @input="changeNetwork"
      >
      </multiselect>

    </div>

    <div class="select is-pulled-left">

      <multiselect
        placeholder="All Domains"
        v-model="domain"
        :options="v_domain"
        :multiple="true"
        @input="changeDomain"
      >
      </multiselect>

    </div>

    <div class="is-pulled-right">
      <a
        class="button is-pulled-right"
        @click="refresh()"
      >
      <span class="icon">
        <i
          class="fas fa-sync-alt"
          :class="{'fa-spin': refreshing}"
        ></i>
      </span>
      </a>

    </div>

    <div class="select is-pulled-right">
      <select
        v-model="pageSize"
        @change="changePageSize"
      >
        <option>10</option>
        <option default="true">20</option>
        <option>50</option>
        <option>100</option>
      </select>
    </div>




  </div>
</template>

<script>

  import Multiselect from 'vue-multiselect'

  export default {
    name: 'Controls',
    components: {
      Multiselect
    },
    props: ['fetchCampaigns', 'setNetwork', 'setDomain', 'setPageSize'],
    data () {
      return {
        refreshing: false,
        network: null,
        v_network: ['Yahoo', 'Outbrain'],
        domain: null,
        v_domain: ['Absolutehistory.com', 'Cafecrime.com', 'Maternityweek.com', 'Newravel.com', 'Petsdetective.com', 'Scribol.com'],
        pageSize: '20',
        v_page: ['10', '20', '50', '100']
      }
    },
    methods: {
      refresh () {
        if (this.refreshing)
          return
        this.refreshing = true
        this.fetchCampaigns().then(() => {
          this.refreshing = false
        })
      },
      changeNetwork() {
        this.setNetwork(this.network)
      },
      changeDomain() {
        this.setDomain(this.domain)
      },
      changePageSize() {
        this.setPageSize(this.pageSize)
      }
    }
  }
</script>

<!-- general style -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
  .multiselect__content-wrapper, .multiselect--active{
    z-index: 10;
  }
  .multiselect {
    background-color: white;
    border-color: #dfdfdf;
    color: #363636;
    cursor: pointer;
    display: block;
    font-size: 1em;
    max-width: 100%;
    outline: none;
    min-height: 30px;
  }
  .multiselect__select {
    display: none;
  }
  .multiselect__tags {
    padding: 7px 40px 0 7px;
    min-height: 18px;
    border: solid 1px #dfdfdf;
  }
  .multiselect__tag {
    background-color: #209cee;
    border-color: transparent;
    color: #fff;
  }
  .multiselect__option--highlight,
  .multiselect__option--highlight:after,
  .multiselect__tag-icon:focus,
  .multiselect__tag-icon:hover {
    background: #209cee;
  }
</style>

<!-- component scoped style -->
<style scoped>
  .select {
    margin-right: 10px;
  }
  select option:hover {
    background: #f00;
  }
</style>
