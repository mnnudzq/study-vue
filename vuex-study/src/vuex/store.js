import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  count: 1
}

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

export default new Vuex.Store({
  state,
  mutations
})
