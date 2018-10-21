
const state = {
  all:

    [
      {
        headerName: "ID",
        field: "internalId",
        editable: false,
        hide: true,
        width: 860
      },

      {
        headerName: "Section Name",
        field: "name",
        pinned: 'left',
        cellRenderer: "agGroupCellRenderer",
        editable: false,
        width: 275
      },
      {
        headerName: "Section Blocked",
        field: "blocked",
        cellClass: [
          "editable"
        ],
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: [
            true,
            false
          ]
        },
        width: 150
      },
      {
        headerName: "Unique Sessions",
        field: "revenue.uniqueSessionsCount",
        editable: false,
        sort: 'desc',
        width: 190
      },
      {
        headerName: "Pageviews",
        field: "revenue.pageViewsCount",
        editable: false,
        width: 170
      },
      {
        headerName: "Publisher ID",
        field: "publisherId",
        hide: true,
        editable: false,
        width: 300
      },
      {
        headerName: "External Publisher ID",
        field: "externalId",
        editable: false,
        hide: true,
        width: 300
      },
      {
        headerName: "Domain",
        field: "revenue.domain",
        editable: false,
        hide: true,
        width: 275
      },
      {
        headerName: "utmSource",
        field: "revenue.utmSource",
        editable: false,
        hide: true,
        width: 275
      },
      {
        headerName: "utmCampaign",
        field: "revenue.utmCampaign",
        editable: false,
        hide: true,
        width: 275
      },
      {
        headerName: "utmContent",
        field: "revenue.utmContent",
        editable: false,
        width: 500
      },
      {
        headerName: "RPS",
        field: "revenue.revenuePerSession",
        editable: false,
        width: 150
      },
      {
        headerName: "CPC Adjustment",
        field: "cpcAdjustment",
        cellClass: [
          "editable"
        ],
        editable: true,
        width: 150
      },
      {
        headerName: "45%",
        valueGetter: 'data.revenue.revenuePerSession-(data.revenue.revenuePerSession*0.45)',
        valueFormatter: 'value.toFixed(3)',
        width: 100,
        editable: false
      },
      {
        headerName: "45%",
        valueGetter: 'data.revenue.revenuePerSession-(data.revenue.revenuePerSession*0.45)',
        valueFormatter: 'value.toFixed(3)',
        width: 100,
        editable: false
      },
      {
        headerName: "35%",
        valueGetter: 'data.revenue.revenuePerSession-(data.revenue.revenuePerSession*0.35)',
        valueFormatter: 'value.toFixed(3)',
        width: 100,
        editable: false
      },
      {
        headerName: "25%",
        valueGetter: 'data.revenue.revenuePerSession-(data.revenue.revenuePerSession*0.25)',
        valueFormatter: 'value.toFixed(3)',
        width: 100,
        editable: false
      },
      {
        headerName: "EstimatedValue",
        field: "revenue.estimatedValue",
        editable: false,
        width: 150
      },
      {
        headerName: "Effective EstimatedValue",
        field: "revenue.effectiveEstimatedValue",
        editable: false,
        width: 150
      },
      {
        headerName: "Total Revenue",
        field: "revenue.totalRevenue",
        editable: false,
        width: 275
      },
      {
        headerName: "Period Start",
        field: "revenue.periodStart",
        editable: false,
        hide: true,
        width: 275
      },
      {
        headerName: "Period End",
        field: "revenue.periodEnd",
        editable: false,
        hide: true,
        width: 275
      }

    ]


}

const mutations = {

}

export default {
  state,
  mutations
}
