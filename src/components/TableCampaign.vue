<!-- template to render -->
<template>
  <div
    class="section"
    :class="{'menu-open': menuOpen}"
  >

    <controls
      :fetchCampaigns="fetchCampaigns"
      :setNetwork="setNetwork"
      :setDomain="setDomain"
      :setPageSize="setPageSize"
    />

    <pagination
      :loading="loading"
      :page="page"
      :pageSize="pageSize"
      :setPage="setPage"
    />

    <ag-grid-vue
      class="ag-theme-material grid"
      :rowData="localCampaigns"
      :columnDefs="columnHeaders"
      :getRowNodeId="getRowNodeId"
      :enableColResize="true"
      :enableSorting="true"
      :enableServerSideSorting="false"
      :singleClickEdit="true"
      :gridOptions="gridOptions"
      :masterDetail="true"
      :detailCellRendererParams="detailCellRendererParams"
      :isRowMaster="isRowMaster"
      :cellValueChanged="onCellValueChanged"
      :sortChanged="onSortChanged"
      :gridReady="onGridReady"
      :suppressScrollOnNewData="true"
    />

  </div>

</template>

<script>
  import { AgGridVue } from "ag-grid-vue"
  import { mapActions, mapState } from 'vuex'
  import Controls from './Controls'
  import Pagination from './Pagination'

  export default {
    name: 'TableCampaign',
    components: {
      AgGridVue,
      Controls,
      Pagination,
      'PButton' : {
        template: '<a class="d_btn button is-info is-small p-button" v-on:click="dispatch">Publishers</a>',
        methods: {
          dispatch() {
            let routeData = window.router.resolve({path: '/publishers', query: {data: this.params.data.id}});
            window.open(routeData.href, '_blank');
          }
        }
      }
    },

    // data(variable) initialization
    data () {
      return {
        loading: true,
        updating: false,
        page: 1,
        pageSize: 20,
        orderField: 'revenue.uniqueSessionsCount',
        orderDir: 'desc',
        network: null,
        domain: null,
        localCampaigns: null,
        gridOptions: {
          suppressPropertyNamesCheck: true,
          overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Loading...</span>'
        },
        detailCellRendererParams: null
      }
    },

    // computing
    computed: {
      ...mapState({
        campaigns: (state) => state.campaigns.all,
        columnHeaders: (state) => state.columnHeaders.all,
        menuOpen: (state) => state.app_state.menuOpen
      })
    },

    // before component renders
    beforeMount() {

      // global variable
      let __this = this

      window.router = this.$router

      // set row expandable or not
      this.isRowMaster = dataItem => {
        return true;
      };

      // set detailed view on master row
      this.detailCellRendererParams = {
        // template for now
        detailGridOptions: {
          suppressPropertyNamesCheck: true,

          columnDefs: [
            { field: "periodStart" },
            { field: "periodEnd" },
            { field: "uniqueSessionsCount" },
            { field: "revenuePerSession" },
            {
              headerName: "45%",
              valueGetter: 'data.revenuePerSession-(data.revenuePerSession*0.45)',
              valueFormatter: 'value.toFixed(3)',
              width: 100,
              editable: false
            },
            {
              headerName: "35%",
              valueGetter: 'data.revenuePerSession-(data.revenuePerSession*0.35)',
              valueFormatter: 'value.toFixed(3)',
              width: 100,
              editable: false
            },
            {
              headerName: "25%",
              valueGetter: 'data.revenuePerSession-(data.revenuePerSession*0.25)',
              valueFormatter: 'value.toFixed(3)',
              width: 100,
              editable: false
            },
            { field: "estimatedValue" },
            { field: "effectiveEstimatedValue"},
            { field: "totalRevenue"},
            { field: "pageViewsCount" },
            // { field: "spend" }
          ],

          // when grid loads
          onGridReady: params => {
            params.api.sizeColumnsToFit();
          }
        },

          // when grid expands to detailed view
          getDetailRowData: function(params) {

            let internalId = params.data.id

            return __this.getRevenueByTimeSegmentsOfCampaign(internalId).then((response) => {
              console.log('response data: ' + response.data)
              params.successCallback(response.data);

            }).catch(e => {
              this.errors.push(e)
            })
          },

          // detailed view template
          template:
            '<div style="height: 100%; background-color: #edf6ff; padding: 20px; box-sizing: border-box;">' +
            '  <div style="height: 10%;">View by time segment</div>' +
            '  <div ref="eDetailGrid" style="height: 90%;"></div>' +
            "</div>"
      };
    },

    // when template renders
    mounted () {
      let p_btn = document.getElementsByClassName("d_btn");
      for (var i = 0; i < p_btn.length; i++) {
        document.addEventListener('click', (e) => {
          if(e.target && e.target.class == 'd_btn')
          {
            console.log("HEY",e);
          }
        });
      }
    },

    // methods(func)
    methods: {
      ...mapActions([
        'getCampaigns',
        'updateCampaign',
        'getRevenueByTimeSegmentsOfCampaign'
        ]),
      onGridReady(params) {
        this.gridApi = params.api
        this.columnApi = params.columnApi
        this.fetchCampaigns()
      },
      fetchCampaigns () {
        this.loading = true;
        return this.getCampaigns({
          page: this.page,
          pageSize: this.pageSize,
          orderField: this.orderField,
          orderDir: this.orderDir,
          network: this.network,
          domain: this.domain
        }).then(() => {
          this.loading = false
        })
      },
      getRowNodeId (data) {
        return data.id
      },
      onCellValueChanged (change) {

        // check if oldValue type is same as newValue
        if(typeof(change.oldValue) == typeof(change.newValue))
        {
          // check if there is any change
          if (change.oldValue == change.newValue)
            return;
        }
        else
        {
          // check if there is any change to value
          if(change.oldValue.toString() == change.newValue)
            return;
        }

        // execute API & dispatch event
        this.notifySubmitting();
        // update campaign
        this.updating = true;
        this.updateCampaign({
          id: change.data.id,
          field: change.colDef.field,
          value: change.newValue
        }).then(() => {
          this.gridApi.stopEditing()
          this.notifySuccess(change)
        }).catch(() => {
          this.gridApi.stopEditing()
          this.notifyError(change)
        })
      },
      onSortChanged (opts) {
        console.log("SORTINGCHANGED")

        let sortModel = opts.api.getSortModel();

        console.log(sortModel)
        console.log(sortModel[0])

        if (sortModel && sortModel[0]) {

          console.log(sortModel[0].colId,":",this.orderField, "-", sortModel[0].sort,":",this.orderDir)
          this.orderField = sortModel[0].colId
          this.orderDir = sortModel[0].sort
        } else {
          this.orderField = null
          this.orderDir = null
        }

        this.fetchCampaigns();
      },
      notifyError (change) {
        this.$notify({
          group: 'main',
          clean: true
        });
        this.$notify({
          group: 'main',
          title: `Error updating campaign ID ${change.data.id}`,
          text: 'Please try again',
          type: 'error'
        })
      },
      notifySubmitting () {
        this.$notify({
          group: 'main',
          clean: true
        })
        this.$notify({
          group: 'main',
          title: `Submitting`,
          type: 'warn'
        })
      },
      notifySuccess (change) {
        this.$notify({
          group: 'main',
          clean: true
        })
        this.$notify({
          group: 'main',
          title: `Successfully updated campaign ID ${change.data.id}`,
          text: `${change.colDef.headerName} is now ${change.newValue}`,
          type: 'success'
        })
      },
      refresh () {
        this.fetchCampaigns()
      },
      setPage (page) {
        this.page = page
      },
      setDomain (domain) {
        this.domain = domain
      },
      setNetwork (network) {
        this.network = network
      },
      setPageSize (size) {
        this.pageSize = size
      }
    },
    watch: {
      page () {
        this.fetchCampaigns()
      },
      pageSize () {
        this.fetchCampaigns()
      },
      orderField () {
        // this.fetchCampaigns()
      },
      orderDir () {
        // this.fetchCampaigns()
      },
      network () {
        this.fetchCampaigns();
      },
      domain () {
        this.fetchCampaigns();
      },
      loading () {
        if (this.loading) {
          this.gridOptions.api.showLoadingOverlay()
        } else {
          this.gridOptions.api.hideOverlay()
        }
      },
      campaigns () {
        this.localCampaigns = JSON.parse(JSON.stringify(this.campaigns));
        console.log(JSON.stringify(this.campaigns))
        this.gridOptions.api.setRowData(this.localCampaigns);
      }
    },
  }
</script>

<style lang="scss">
.section {
  padding-top: 1rem;
  padding-bottom: 0;
}
.ag-theme-material {
  .ag-header-cell {
    padding-left: 24px;
    padding-right: 0;
    text-align: center;
  }
  .ag-cell-focus {
    border: 1px solid transparent;
  }
  .ag-cell.editable {
    background: rgba(100, 100, 100, 0.1) !important;
    cursor: pointer;
  }
  .ag-cell-inline-editing {
    background: #f7f7f7 !important;
    height: 46px;
    padding: 12px 24px;
  }
  .ag-bl-overlay {
    pointer-events: auto;
  }
}
.grid {
  height: 70vh;
  height: calc(100vh - 260px);
}
.p-button {
  margin-top: 8px;
}
@media screen and (min-width: 768px) {
  .section {
    transition: padding 0.3s;
    &.menu-open {
      padding-left: 300px;
    }
  }
}
</style>
