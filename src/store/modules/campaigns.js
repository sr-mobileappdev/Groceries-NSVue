import Vue from 'vue'

// initial state
const state = {
  all: null,
  total: 0
}

// mutations
const mutations = {
  SET_CAMPAIGNS (state, campaigns) {
    state.all = campaigns
  },
  SET_TOTAL_CAMPAIGNS (state, total) {
    state.total = total
  },
  UPDATE_CAMPAIGN (state, { id, field, value }) {
    let idx = state.all.findIndex((c) => {
      return c.id == id
    });
    let campaign = state.all[idx];
    console.log(campaign)
    console.log(field)
    console.log(value)

    // campaign[field] = value;

    let obj = campaign
    let prop = field

    function assign(obj, prop, value) {
      if (typeof prop === "string")
        prop = prop.split(".");

      if (prop.length > 1) {
        var e = prop.shift();
        assign(obj[e] =
            Object.prototype.toString.call(obj[e]) === "[object Object]"
              ? obj[e]
              : {},
          prop,
          value);
      } else
        obj[prop[0]] = value;
    }

    assign(obj, prop, value);
    Vue.set(state.all, idx, obj)
  },
}

export default {
  state,
  mutations
}
