<template>
  <div
    class="section"
    :class="{'menu-open': menuOpen}"
  >

    <ag-grid-vue
      class="ag-theme-material grid"
      :rowData="localCampaignsPublisher"
      :cellValueChanged="onCellValueChanged"
      :columnDefs="columnHeadersPublisher"
      :getRowNodeId="getRowNodeId"
      :gridReady="onGridReady"
      :enableColResize="true"
      :enableSorting="true"
      :singleClickEdit="true"
      :gridOptions="gridOptions"
      :masterDetail="true"
      :detailCellRendererParams="detailCellRendererParams"
      :isRowMaster="isRowMaster"
      :enableFilter="true"
    />

  </div>
</template>

<script>
  import { AgGridVue } from "ag-grid-vue"
  import { mapActions, mapState } from 'vuex'
  import Controls from './Controls'
  import Pagination from './Pagination'

  export default {
    name: 'TablePublisher',
    components: {
      AgGridVue,
      Controls,
      Pagination
    },

    // data(variable) initialization
    data () {
      return {
        loading: true,
        updating: false,
        page: 1,
        pageSize: 20,
        orderField: null,
        orderDir: null,
        search: null,
        localCampaignsPublisher: null,
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
        columnHeadersPublisher: (state) => state.columnHeadersPublisher.all,
        menuOpen: (state) => state.app_state.menuOpen
      })
    },

    // before component renders
    beforeMount() {
      this.isRowMaster = dataItem => {
        return true
      }

      let __this = this
      window.router = this.$router

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



          let internalId = __this.$route.query.data
          let sectionUtmContent = params.data.revenue.utmContent


          return __this.getRevenueByTimeSegmentsOfSection(internalId, sectionUtmContent).then((response) => {
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

    // methods(func)
    methods: {
      ...mapActions([
        'getPublisherSegmentsOfCampaign',
        'updateCampaignPublisher',
        'getRevenueByTimeSegmentsOfSection'
      ]),
      onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
      },
      fetchCampaigns () {
        console.log('fetch for campaign id: ' + this.$route.query.data);

        this.loading = true;

        return this.getPublisherSegmentsOfCampaign(
          this.$route.query.data
        ).then(() => {
          this.loading = false
        })

      },
      getRowNodeId (data) {
        return data.internalId
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
          if (change.oldValue != null && change.oldValue.toString() == change.newValue)
            return;
        }

        this.notifySubmitting();

        // update campaign
        this.updating = true;

        this.updateCampaignPublisher({
          campaignId: this.$route.query.data,
          internalId: change.data.internalId,
          externalId: change.data.externalId,
          field: change.colDef.field,
          value: change.newValue
        }).then(() => {
          this.notifySuccess(change)
        }).catch(() => {
          this.notifyError(change)
        })

      },
      onSortChanged (opts) {
        let sortModel = opts.api.getSortModel();
        if (sortModel && sortModel[0]) {
          this.orderField = sortModel[0].colId;
          this.orderDir = sortModel[0].sort
        } else {
          this.orderField = null;
          this.orderDir = null
        }
      },
      notifyError (change) {
        this.$notify({
          group: 'main',
          clean: true
        });
        this.$notify({
          group: 'main',
          title: `Error updating section ID ${change.data.internalId}`,
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
          title: `Successfully updated section ID ${change.data.internalId}`,
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
      setSearch (search) {
        this.search = search
      }
    },
    watch: {
      page () {
        this.fetchCampaigns()
      },
      orderField () {
        this.fetchCampaigns()
      },
      orderDir () {
        this.fetchCampaigns()
      },
      search () {
        this.fetchCampaigns()
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
        this.gridOptions.api.setRowData(this.localCampaigns);
      }
    },

    // when template renders
    mounted () {
      this.fetchCampaigns()
    },
  }
</script>

<style lang="scss">
  .section {
    padding-bottom: 0;
    padding-top: 1rem;
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
  }
  .grid {
    height: 70vh;
    height: calc(100vh - 100px);
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
