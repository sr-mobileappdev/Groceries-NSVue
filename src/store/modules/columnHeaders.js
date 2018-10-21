
const state = {
  all: [
    {
      width: 122,
      editable: false,
      cellRendererFramework: "PButton",
      suppressSorting: true
    },
    {
      headerName: "Campaign Name",
      cellRenderer: "agGroupCellRenderer",
      field: "name",
      pinned: 'left',
      editable: false,
      width: 350
    },
    {
      headerName: "ID",
      field: "id",
      hide: true,
      editable: false,
      suppressSorting: true,
      width: 350
    },
    {
      headerName: "URL",
      field: "externalUrl",
      suppressSorting: true,
      hide: true,
      editable: false,
      width: 300
    },
    {
      headerName: "Account ID",
      field: "accountId",
      suppressSorting: true,
      editable: false,
      hide: true,
      width: 100
    },
    {
      headerName: "Enabled",
      field: "campaignLiveStatus.enabled",
      cellClass: ['editable'],
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: [true, false]
      },
      width: 95,
      suppressSorting: true
    },
    {
      headerName: "Creation Date",
      field: "campaignCreationTime",
      editable: false,
      width: 195,
      suppressSorting: true,
      filter: "agDateColumnFilter"
    },
    {
      headerName: "Network",
      field: "source",
      editable: false,
      suppressSorting: true,
      width: 110
    },
    {
      headerName: "Device",
      field: "targetPlatforms",
      editable: false,
      suppressSorting: true,
      width: 200
    },
    {
      headerName: "Device OS",
      field: "targetOperatingSystems",
      editable: false,
      suppressSorting: true,
      hide: true,
      width: 110
    },
    {
      headerName: "Browser",
      field: "targetBrowsers",
      editable: false,
      hide: true,
      suppressSorting: true,
      width: 110
    },
    {
      headerName: "CPC",
      field: "cpc",
      cellClass: ['editable'],
      editable: true,
      suppressSorting: true,
      width: 85
    },
    {
      headerName: "RPS",
      field: "revenue.revenuePerSession",
      editable: false,
      suppressSorting: true,
      width: 110
    },
    {
      headerName: "45%",
      valueGetter: 'data.revenue.revenuePerSession-(data.revenue.revenuePerSession*0.45)',
      valueFormatter: 'value.toFixed(3)',
      suppressSorting: true,
      width: 100,
      editable: false
    },
    {
      headerName: "35%",
      valueGetter: 'data.revenue.revenuePerSession-(data.revenue.revenuePerSession*0.35)',
      valueFormatter: 'value.toFixed(3)',
      suppressSorting: true,
      width: 100,
      editable: false
    },
    {
      headerName: "25%",
      valueGetter: 'data.revenue.revenuePerSession-(data.revenue.revenuePerSession*0.25)',
      valueFormatter: 'value.toFixed(3)',
      suppressSorting: true,
      width: 100,
      editable: false
    },
    {
      headerName: "Budget",
      field: "campaignBudget.amount",
      cellClass: ['editable'],
      suppressSorting: true,
      editable: true,
      width: 100
    },
    {
      headerName: "Domain",
      field: "revenue.domain",
      editable: false,
      suppressSorting: true,
      width: 200
    },
    {
      headerName: "Source",
      field: "revenue.utmSource",
      editable: false,
      suppressSorting: true,
      width: 150
    },
    {
      headerName: "utmCampaign",
      field: "revenue.utmCampaign",
      editable: false,
      hide: true,
      suppressSorting: true,
      width: 100
    },
    {
      headerName: "utmContent",
      field: "revenue.utmContent",
      editable: false,
      hide: true,
      suppressSorting: true,
      width: 100
    },
    {
      headerName: "Unique Sessions",
      field: "revenue.uniqueSessionsCount",
      editable: false,
      sort: 'desc',
      width: 190
    },
    {
      headerName: "Publisher Revenue",
      field: "revenue.estimatedValue",
      editable: false,
      suppressSorting: true,
      width: 175
    },
    {
      headerName: "Pageviews",
      field: "revenue.pageViewsCount",
      editable: false,
      suppressSorting: true,
      width: 150,
    },
    {
      headerName: "Revenue Period Start",
      field: "revenue.periodStart",
      editable: false,
      suppressSorting: true,
      width: 200
    },
    {
      headerName: "Revenue Period End",
      field: "revenue.periodEnd",
      editable: false,
      suppressSorting: true,
      width: 200
    },
    {
      headerName: "Effective EstimatedValue",
      field: "revenue.effectiveEstimatedValue",
      editable: false,
      suppressSorting: true,
      width: 225
    },
    {
      headerName: "Total Revenue",
      field: "revenue.totalRevenue",
      editable: false,
      suppressSorting: true,
      width: 150
    },
    {
      headerName: "Budget Name",
      field: "campaignBudget.name",
      editable: false,
      hide: true,
      suppressSorting: true,
      width: 200,
    },
    {
      headerName: "Budget Amount Remaining",
      field: "campaignBudget.amountRemaining",
      editable: false,
      hide: true,
      suppressSorting: true,
      width: 100
    },
    {
      headerName: "Budget Pacing",
      field: "campaignBudget.pacing",
      editable: false,
      hide: true,
      suppressSorting: true,
      width: 100
    },
    {
      headerName: "Budget Currency",
      field: "campaignBudget.currency",
      editable: false,
      hide: true,
      suppressSorting: true,
      width: 100
    },
    {
      headerName: "Budget Type",
      field: "campaignBudget.type",
      editable: false,
      hide: true,
      suppressSorting: true,
      width: 100
    },
    {
      headerName: "Budget Start Date",
      field: "campaignBudget.startDate",
      editable: false,
      hide: true,
      suppressSorting: true,
      width: 100
    },
    {
      headerName: "Budget Run Forever",
      field: "campaignBudget.runForever",
      editable: false,
      hide: true,
      suppressSorting: true,
      width: 100
    },
    {
      headerName: "Budget End Date",
      field: "campaignBudget.endDate",
      editable: false,
      hide: true,
      suppressSorting: true,
      width: 100
    },
    {
      headerName: "Budget Daily Target",
      field: "campaignBudget.dailyTarget",
      editable: false,
      hide: true,
      suppressSorting: true,
      width: 100
    },
    {
      headerName: "On Air",
      field: "campaignLiveStatus.onAir",
      editable: false,
      suppressSorting: true,
      width: 100
    },
    {
      headerName: "On Air Reason",
      field: "campaignLiveStatus.onAirReason",
      editable: false,
      suppressSorting: true,
      width: 220
    },
    {
      headerName: "Amount spent",
      field: "campaignLiveStatus.amountSpent",
      editable: false,
      suppressSorting: true,
      width: 160
    }
  ]
};

const mutations = {

}

export default {
  state,
  mutations
}
