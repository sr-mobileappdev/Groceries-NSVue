import axios from 'axios'

import cognitoAuth from '@/cognito'
import config from '@/config'
import Vue from 'vue'

export const getCampaigns = function ({ commit, state}, {page, pageSize, orderField, orderDir, network, domain }) {

  let params = new URLSearchParams()

  params.append("page", page -1)
  params.append("per_page", pageSize)

  if (orderField != null) {
    params.append("order_by", orderField)
  }

  if (orderDir != null) {
    params.append("order", orderDir)
  }

  if (network && network.length > 0) {
    for (var i = 0; i < network.length; i++) {
      params.append("sources", network[i].toLowerCase())
    }
  }

  if (domain && domain.length > 0) {
    for (var i = 0; i < domain.length; i++) {
      params.append("domains", domain[i].toLowerCase())
    }
  }

  let options = {
    params: params
  }

  return axios.get(config.endpoints.campaigns + '/api/campaigns', options).then((response) => {
    commit('SET_CAMPAIGNS', response.data.content)
    commit('SET_TOTAL_CAMPAIGNS', response.data.totalElements)
  }).catch(error => {
    console.log(error)
  })

}

export const updateCampaign = function ({ commit, state }, { id, field, value }) {

  var oldField = field

  if(field === "campaignBudget.amount") {
    field = "campaignBudget";
  }
  if(field === "campaignLiveStatus.enabled") {
    field = "enabled";
  }
  let options = {
    [field]: value
  };

  field = oldField

  console.log("field" + field)
  console.log("value" + value)

  return axios.put(config.endpoints.campaigns + '/api/campaigns/' + id, options).then((response) => {
    commit('UPDATE_CAMPAIGN', { id, field, value })
  }).catch(e => {
    console.log(e)
  })

}

export const getPublisherSegmentsOfCampaign = function ({commit, state }, campaignId) {

  return axios.get(config.endpoints.campaigns + '/api/campaigns/' + campaignId).then((response) => {

    commit('SET_CAMPAIGNS', response.data.campaignSections);
    commit('SET_TOTAL_CAMPAIGNS', response.data.campaignSections.totalElements)

  }).catch(e => {
    console.log(e)
  })
}

export const getRevenueByTimeSegmentsOfCampaign = function ({commit, state}, internalId) {

  let options = {
    params: {
      internalId: internalId
    }
  }

  return axios.get(config.endpoints.campaigns + '/api/campaigns/revenues', options).then((response) => {
    return response
  }).catch(error => {
    return error
  })

}

export const getRevenueByTimeSegmentsOfSection = function ({commit, state}, campaignInternalId, sectionUtmContent) {

  let options = {
    params: {
      internalId: campaignInternalId,
      utmContent: sectionUtmContent
    }
  }


  return axios.get(config.endpoints.campaigns + '/api/campaigns/revenues', options).then((response) => {
    return response
  }).catch(error => {
    return error
  })


}


export const updateCampaignPublisher = function ({ commit, state }, { campaignId, internalId, externalId, field, value }) {

  var urlAppend = ''
  var sectionId = ''

  let options = {
    [field]: value
  }

  if (internalId == null) {
    urlAppend = 'external/'
    sectionId = externalId

    return axios.post(config.endpoints.campaigns + '/api/campaigns/' + campaignId + '/section/' + urlAppend + sectionId, options).then((response) => {
      console.log('Updated campaign section successfully')
    }).catch(e => {
      console.log(e)
      reject()
    })

  } else {
    sectionId = internalId

    return axios.put(config.endpoints.campaigns + '/api/campaigns/' + campaignId + '/section/' + urlAppend + sectionId, options).then((response) => {
      console.log('Updated campaign section successfully')
    }).catch(e => {
      console.log(e)
      reject()
    })

  }


}
