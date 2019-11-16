import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// vuex data
const state = {
  count: 1
};

// vuex motheds
const mutations = {
  add(state, val) {
    state.count += val;
    // return state.count;
  },
  reduce(state) {
    state.count --;
    // return state.count;
  }
};

// vuex computed
const getters = {
  count2: (state) => {
    return state.count + 36;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  getters
})
